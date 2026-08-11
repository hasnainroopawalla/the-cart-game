import { NUMERIC_ATTRIBUTES, CartItems, Catalog } from "../../data";
import { type NumericAttributeName, type RuleProgress, Rule } from "../rule";
import { RuleUtils, type ItemPredicate } from "../rule.utils";
import { MathUtils } from "../../utils";

/** Share of the catalog that should clear the bar, taken from whichever tail is scarce. */
const QUALIFYING_SHARE = 0.2;

/** Below this the target collapses to "at least 1", which any cart trips over by accident. */
const MIN_SOLUTION_QUALIFIERS = 2;

const MIN_TARGET_COUNT = 1;
const TARGET_SLACK = { min: 0, max: 1 };

/** Drawn from the catalog spread, so the bar excludes most of the shelf. */
const getBar = (attribute: NumericAttributeName): number => {
  const { betterWhen } = NUMERIC_ATTRIBUTES[attribute];

  const values = Catalog.items
    .map((item) => item.attributes[attribute])
    .sort((a, b) => a - b);

  // Unsnapped: per-item bars sit near zero, where rounding to `step` swallows the spread.
  const index =
    betterWhen === "higher"
      ? Math.floor(values.length * (1 - QUALIFYING_SHARE))
      : Math.floor(values.length * QUALIFYING_SHARE);

  return values[index];
};

const clearsBar =
  (attribute: NumericAttributeName, bar: number): ItemPredicate =>
  (item) =>
    NUMERIC_ATTRIBUTES[attribute].betterWhen === "higher"
      ? item.attributes[attribute] >= bar
      : item.attributes[attribute] <= bar;

export class CountWithPredicateRule extends Rule {
  protected attribute: NumericAttributeName;
  protected count: number;
  protected amount: number;

  public static canApply(
    solutionCart: CartItems,
    attribute: NumericAttributeName,
  ): boolean {
    return RuleUtils.solutionSupports(
      solutionCart,
      clearsBar(attribute, getBar(attribute)),
      MIN_SOLUTION_QUALIFIERS,
    );
  }

  constructor(solutionCart: CartItems, attribute: NumericAttributeName) {
    super(`${attribute}-count-with-predicate`, solutionCart);

    this.attribute = attribute;
    this.amount = getBar(attribute);
    this.count = this.generateCount(solutionCart);
  }

  public getLabel(): string {
    const { unit, label, betterWhen } = NUMERIC_ATTRIBUTES[this.attribute];
    const bar =
      betterWhen === "higher"
        ? `${this.amount}${unit} or more`
        : `under ${this.amount}${unit}`;

    return `At least ${this.count} different item${this.count > 1 ? "s" : ""} with ${bar} of ${label}`;
  }

  public evaluate(cartItems: CartItems): boolean {
    return this.countQualifying(cartItems) >= this.count;
  }

  public getProgress(cartItems: CartItems): RuleProgress {
    return {
      current: `${this.countQualifying(cartItems)}`,
      target: `${this.count}`,
    };
  }

  private countQualifying(cartItems: CartItems): number {
    return RuleUtils.countMatchingItems(
      cartItems,
      clearsBar(this.attribute, this.amount),
    );
  }

  private generateCount(solutionCart: CartItems): number {
    const qualifying = this.countQualifying(solutionCart);

    return Math.max(
      MIN_TARGET_COUNT,
      qualifying - MathUtils.randomInt(TARGET_SLACK.min, TARGET_SLACK.max),
    );
  }
}
