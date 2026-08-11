import { CartItems, CartUtils } from "../../data";
import { MathUtils } from "../../utils";
import { Rule, type RuleProgress } from "../rule";

const STEP = 10;
const SLACK_PERCENT = { min: 5, max: 20 };

const getAveragePrice = (cartItems: CartItems): number => {
  const itemCount = CartUtils.getItemCount(cartItems);

  return itemCount === 0 ? 0 : CartUtils.getTotal(cartItems) / itemCount;
};

export class AveragePriceRule extends Rule {
  private target: number;

  constructor(solutionCart: CartItems) {
    super("average-price", solutionCart);

    const slack =
      1 + MathUtils.randomInt(SLACK_PERCENT.min, SLACK_PERCENT.max) / 100;

    this.target = MathUtils.ceilTo(getAveragePrice(solutionCart) * slack, STEP);
  }

  public getLabel(): string {
    return `Average price per item under ₹${this.target}`;
  }

  public evaluate(cartItems: CartItems): boolean {
    // An empty cart has no average, and passing here would show the rule green with nothing done.
    if (CartUtils.getItemCount(cartItems) === 0) {
      return false;
    }

    return getAveragePrice(cartItems) <= this.target;
  }

  public getProgress(cartItems: CartItems): RuleProgress {
    return {
      current: `₹${Math.round(getAveragePrice(cartItems))}`,
      target: `₹${this.target}`,
    };
  }
}
