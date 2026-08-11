import { NUMERIC_ATTRIBUTES, CartItems, CartUtils } from "../../data";
import { MathUtils } from "../../utils";
import { NumericAttributeName, Rule, type RuleProgress } from "../rule";

export class TotalAttributeRule extends Rule {
  protected attribute: NumericAttributeName;
  protected amount: number;

  constructor(solutionCart: CartItems, attribute: NumericAttributeName) {
    super(`${attribute}-amount`, solutionCart);

    this.attribute = attribute;
    this.amount = this.generateAmount(attribute, solutionCart);
  }

  public getLabel(): string {
    const { unit, label, betterWhen } = NUMERIC_ATTRIBUTES[this.attribute];

    switch (betterWhen) {
      case "higher":
        return `At least ${this.amount}${unit} of total ${label}`;
      case "lower":
        return `At most ${this.amount}${unit} of total ${label}`;
    }
  }

  public evaluate(cartItems: CartItems): boolean {
    const attributeValue = CartUtils.sumAttribute(cartItems, this.attribute);

    const { betterWhen } = NUMERIC_ATTRIBUTES[this.attribute];

    switch (betterWhen) {
      case "higher":
        return attributeValue >= this.amount;
      case "lower":
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

  private generateAmount(
    attribute: NumericAttributeName,
    solutionCart: CartItems,
  ): number {
    const amountInCart = CartUtils.sumAttribute(solutionCart, this.attribute);

    const { step, slackSteps, betterWhen } = NUMERIC_ATTRIBUTES[attribute];
    const slack = MathUtils.randomInt(slackSteps.min, slackSteps.max) * step;

    switch (betterWhen) {
      case "higher":
        return Math.max(0, MathUtils.floorTo(amountInCart - slack, step));
      case "lower":
        return MathUtils.ceilTo(amountInCart + slack, step);
    }
  }
}
