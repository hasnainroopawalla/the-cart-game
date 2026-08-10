import { NUMERIC_ATTRIBUTES, CartItems, CartUtils } from "../data";
import { MathUtils } from "../utils";
import { AttributeName, Rule, type RuleProgress } from "./rule";

const COMPARISONS = ["at least", "at most"] as const;
type Comparison = (typeof COMPARISONS)[number];

export class TotalAttributeRule extends Rule {
  protected attribute: AttributeName;
  protected amount: number;
  protected comparison: Comparison;

  constructor(solutionCart: CartItems, attribute: AttributeName) {
    super(`${attribute}-amount`, solutionCart);

    this.attribute = attribute;
    [this.amount, this.comparison] = this.generateConstraint(solutionCart);
  }

  public getLabel(): string {
    const { unit, label } = NUMERIC_ATTRIBUTES[this.attribute];

    switch (this.comparison) {
      case "at least":
        // TODO: too wordy
        return `Cart must total at least ${this.amount}${unit} of ${label}`;
      case "at most":
        return `Cart must not exceed ${this.amount}${unit} of ${label}`;
      default:
        return "";
    }
  }

  public evaluate(cartItems: CartItems): boolean {
    const attributeValue = CartUtils.sumAttribute(cartItems, this.attribute);

    switch (this.comparison) {
      case "at least":
        return attributeValue >= this.amount;
      case "at most":
        return attributeValue <= this.amount;
      default:
        return false;
    }
  }

  public getProgress(cartItems: CartItems): RuleProgress {
    const { unit } = NUMERIC_ATTRIBUTES[this.attribute];

    return {
      current: `${CartUtils.sumAttribute(cartItems, this.attribute)}${unit}`,
      target: `${this.amount}${unit}`,
    };
  }

  private generateConstraint(solutionCart: CartItems): [number, Comparison] {
    const amountInCart = CartUtils.sumAttribute(solutionCart, this.attribute);

    const comparison =
      COMPARISONS[MathUtils.randomInt(0, COMPARISONS.length - 1)];

    const { step, slackSteps } = NUMERIC_ATTRIBUTES[this.attribute];
    const slack = MathUtils.randomInt(slackSteps.min, slackSteps.max) * step;

    let amount: number;
    switch (comparison) {
      case "at least":
        amount = Math.max(0, MathUtils.floorTo(amountInCart - slack, step));
        break;
      case "at most":
        amount = MathUtils.ceilTo(amountInCart + slack, step);
        break;
    }

    return [amount, comparison];
  }
}
