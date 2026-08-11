import { CartItems } from "../../data";
import { MathUtils } from "../../utils";
import { Rule, type RuleProgress } from "../rule";
import { RuleUtils } from "../rule.utils";

/** Below this the rule asks for breadth a one-item cart already has. */
const MIN_TARGET_CATEGORIES = 2;

const TARGET_SLACK = { min: 0, max: 1 };

const getTarget = (solutionCart: CartItems): number =>
  Math.max(
    MIN_TARGET_CATEGORIES,
    RuleUtils.countDistinctCategories(solutionCart) -
      MathUtils.randomInt(TARGET_SLACK.min, TARGET_SLACK.max),
  );

export class DiversityRule extends Rule {
  private target: number;

  public static canApply(solutionCart: CartItems): boolean {
    return (
      RuleUtils.countDistinctCategories(solutionCart) > MIN_TARGET_CATEGORIES
    );
  }

  constructor(solutionCart: CartItems) {
    super("diversity-category", solutionCart);

    this.target = getTarget(solutionCart);
  }

  public getLabel(): string {
    return `Items from at least ${this.target} different categories`;
  }

  public evaluate(cartItems: CartItems): boolean {
    return RuleUtils.countDistinctCategories(cartItems) >= this.target;
  }

  public getProgress(cartItems: CartItems): RuleProgress {
    return {
      current: `${RuleUtils.countDistinctCategories(cartItems)}`,
      target: `${this.target}`,
    };
  }
}
