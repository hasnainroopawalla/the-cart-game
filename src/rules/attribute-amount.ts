import { CartItems, CartUtils, Catalog, NumericAttributes } from "../data";
import { MathUtils } from "../utils";
import { Rule, type RuleProgress } from "./rule";

type AttributeName = keyof NumericAttributes;

abstract class AttributeAmountRule extends Rule {
  protected attribute: AttributeName;
  protected amount: number;
  protected operation: "at least" | "at most" | "exactly";

  constructor(solutionCart: CartItems, attribute: AttributeName) {
    super(`${attribute}-amount`, solutionCart);

    Array.from(solutionCart.entries()).reduce(([itemId, solutionQuantity]) => {
      const item = Catalog.byId.get(itemId);

      item?.attributes.protein;
    });

    this.amount = MathUtils.randomInt(1, solutionQuantity - 1);
  }

  public getLabel(): string {
    // TODO: fix pluralization
    return `At least ${this.attribute} ${this.amount}g.`;
  }

  public evaluate(cartItems: CartItems): boolean {
    const count = CartUtils.countByCategory(cartItems);

    return count >= this.amount;
  }

  public getProgress(cartItems: CartItems): RuleProgress {
    return {
      current: String(CartUtils.countByCategory(cartItems)),
      target: String(this.amount),
    };
  }

  private getCategoryCountInCart(cartItems: CartItems): number {
    return Array.from(cartItems.entries()).reduce((acc, [itemId, quantity]) => {
      const item = Catalog.byId.get(itemId);

      if (!item) {
        // TODO: move to error class
        throw new Error(`Unknown Item. [id=${itemId}]`);
      }

      if (item.attributes.category === this.category) {
        return acc + quantity;
      }
      return acc;
    }, 0);
  }
}

export class ProteinAmountRule extends AttributeAmountRule {
  constructor(solutionCart: CartItems) {
    super(solutionCart, "protein");
  }
}
