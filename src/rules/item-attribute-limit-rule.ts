import { ATTRIBUTE_META, CartItems, CartUtils } from "../data";
import { type AttributeName, type RuleProgress, Rule } from "./rule";
import { MathUtils } from "../utils";

export class ItemAttributeLimitRule extends Rule {
  protected attribute: AttributeName;
  protected amount: number;

  constructor(solutionCart: CartItems, attribute: AttributeName) {
    super(`${attribute}-amount`, solutionCart);

    this.attribute = attribute;
    this.amount = this.generateAmount(solutionCart);
  }

  public getLabel(): string {
    const { unit, label } = ATTRIBUTE_META[this.attribute];
    return `Avoid items above ${this.amount}${unit} of ${label}`;
  }

  public evaluate(cartItems: CartItems): boolean {
    const attributeValues = Array.from(cartItems.entries()).map(([itemId]) => {
      const item = CartUtils.getCatalogItem(itemId);
      return item.attributes[this.attribute];
    });

    return attributeValues.every((value) => value <= this.amount);
  }

  public getProgress(_cartItems: CartItems): RuleProgress {
    return {
      current: undefined,
      target: undefined,
    };
  }

  private generateAmount(solutionCart: CartItems): number {
    const maxAttributeValue = Math.max(
      ...Array.from(solutionCart.entries()).map(([itemId]) => {
        const item = CartUtils.getCatalogItem(itemId);
        return item.attributes[this.attribute];
      }),
    );

    return MathUtils.floorTo(maxAttributeValue + MathUtils.randomInt(1, 1), 5);
  }
}
