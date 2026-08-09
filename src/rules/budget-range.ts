import { CartItems, CartUtils } from "../data";
import { MathUtils } from "../utils";
import { Rule, type RuleProgress } from "./rule";

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
    const step = 50;

    const min =
      Math.floor(total / step) * step - MathUtils.randomInt(100, 300, step);
    const max =
      Math.ceil(total / step) * step + MathUtils.randomInt(100, 300, step);

    return [Math.max(0, min), max];
  }
}
