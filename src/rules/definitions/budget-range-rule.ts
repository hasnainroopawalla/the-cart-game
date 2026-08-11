import { CartItems, CartUtils } from "../../data";
import { MathUtils } from "../../utils";
import { Rule, type RuleProgress } from "../rule";

const STEP = 50;
const SLACK_RUPEES = { min: 30, max: 80 };

export class BudgetRangeRule extends Rule {
  private min: number;
  private max: number;

  constructor(solutionCart: CartItems) {
    super("budget-range", solutionCart);

    [this.min, this.max] = this.generateRange(solutionCart);
  }

  public getLabel(): string {
    return `Spend between ₹${this.min} and ₹${this.max}.`;
  }

  public evaluate(cartItems: CartItems): boolean {
    const cartAmount = CartUtils.getTotal(cartItems);
    return cartAmount >= this.min && cartAmount <= this.max;
  }

  public getProgress(cartItems: CartItems): RuleProgress {
    return {
      current: `₹${CartUtils.getTotal(cartItems)}`,
    };
  }

  private generateRange(solutionCart: CartItems): [number, number] {
    const total = CartUtils.getTotal(solutionCart);

    const min = MathUtils.floorTo(
      total - MathUtils.randomInt(SLACK_RUPEES.min, SLACK_RUPEES.max),
      STEP,
    );
    const max = MathUtils.ceilTo(
      total + MathUtils.randomInt(SLACK_RUPEES.min, SLACK_RUPEES.max),
      STEP,
    );

    return [Math.max(0, min), max];
  }
}
