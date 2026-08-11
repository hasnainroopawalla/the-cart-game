import { CartItems, CartUtils } from "../../data";
import { MathUtils } from "../../utils";
import { Rule, type RuleProgress } from "../rule";

const SLACK_ITEMS = { min: 0, max: 1 };

/** The one rule that punishes padding the cart, so it is deliberately an upper bound. */
export class CartSizeRule extends Rule {
  private target: number;

  constructor(solutionCart: CartItems) {
    super("cart-size", solutionCart);

    this.target =
      CartUtils.getItemCount(solutionCart) +
      MathUtils.randomInt(SLACK_ITEMS.min, SLACK_ITEMS.max);
  }

  public getLabel(): string {
    return `At most ${this.target} items in the cart`;
  }

  public evaluate(cartItems: CartItems): boolean {
    return CartUtils.getItemCount(cartItems) <= this.target;
  }

  public getProgress(cartItems: CartItems): RuleProgress {
    return {
      current: `${CartUtils.getItemCount(cartItems)}`,
      target: `${this.target}`,
    };
  }
}
