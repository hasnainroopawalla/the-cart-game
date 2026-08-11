import { CartItems, CartUtils, Categories } from "../../data";
import { Rule, type RuleProgress } from "../rule";
import { type ItemPredicate } from "../rule.utils";

type Measure = "items" | "spend";

type Comparison = "at least" | "at most";

export type RatioSubject = {
  id: string;
  measure: Measure;
  comparison: Comparison;
  matches: ItemPredicate;
  describe: (fraction: string) => string;
};

/** Fractions a player can hold in their head, so targets read as words. */
const FRACTIONS = [
  { value: 1 / 4, label: "a quarter" },
  { value: 1 / 3, label: "a third" },
  { value: 1 / 2, label: "half" },
  { value: 2 / 3, label: "two thirds" },
  { value: 3 / 4, label: "three quarters" },
];

export const RATIO_SUBJECTS: RatioSubject[] = [
  {
    id: "vegetarian",
    measure: "items",
    comparison: "at least",
    matches: (item) => item.attributes.isVegetarian,
    describe: (fraction) => `At least ${fraction} the cart must be vegetarian`,
  },
  ...Categories.map(
    (category): RatioSubject => ({
      id: `spend-${category}`,
      measure: "spend",
      comparison: "at most",
      matches: (item) => item.attributes.category === category,
      describe: (fraction) => `Spend at most ${fraction} on ${category}`,
    }),
  ),
];

const measureTotal = (cartItems: CartItems, measure: Measure): number =>
  measure === "spend"
    ? CartUtils.getTotal(cartItems)
    : CartUtils.getItemCount(cartItems);

const measureMatching = (
  cartItems: CartItems,
  measure: Measure,
  matches: ItemPredicate,
): number =>
  Array.from(cartItems.entries()).reduce((sum, [itemId, quantity]) => {
    const item = CartUtils.getCatalogItem(itemId);
    if (!matches(item)) {
      return sum;
    }

    return sum + (measure === "spend" ? item.price * quantity : quantity);
  }, 0);

const getShare = (cartItems: CartItems, subject: RatioSubject): number => {
  const total = measureTotal(cartItems, subject.measure);

  return total === 0
    ? 0
    : measureMatching(cartItems, subject.measure, subject.matches) / total;
};

/** The tightest friendly fraction the solution still clears. */
const getFraction = (
  solutionCart: CartItems,
  subject: RatioSubject,
): (typeof FRACTIONS)[number] | undefined => {
  const share = getShare(solutionCart, subject);

  return subject.comparison === "at least"
    ? FRACTIONS.filter((fraction) => fraction.value <= share).at(-1)
    : FRACTIONS.find((fraction) => fraction.value >= share);
};

export class RatioRule extends Rule {
  private subject: RatioSubject;
  private fraction: (typeof FRACTIONS)[number];

  public static canApply(
    solutionCart: CartItems,
    subject: RatioSubject,
  ): boolean {
    return getFraction(solutionCart, subject) !== undefined;
  }

  constructor(solutionCart: CartItems, subject: RatioSubject) {
    super(`ratio-${subject.id}`, solutionCart);

    this.subject = subject;
    this.fraction = getFraction(solutionCart, subject)!;
  }

  public getLabel(): string {
    return this.subject.describe(this.fraction.label);
  }

  public evaluate(cartItems: CartItems): boolean {
    // An empty cart has no proportions, and passing here would leave the rule green with nothing done.
    if (measureTotal(cartItems, this.subject.measure) === 0) {
      return false;
    }

    const share = getShare(cartItems, this.subject);

    return this.subject.comparison === "at least"
      ? share >= this.fraction.value
      : share <= this.fraction.value;
  }

  public getProgress(cartItems: CartItems): RuleProgress {
    return {
      current: `${Math.round(getShare(cartItems, this.subject) * 100)}%`,
      target: `${Math.round(this.fraction.value * 100)}%`,
    };
  }
}
