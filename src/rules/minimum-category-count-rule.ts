import { CartItems, CartUtils, Catalog, Category } from "../data";
import { MathUtils } from "../utils";
import { Rule, type RuleProgress } from "./rule";

export class MinimumCategoryCountRule extends Rule {
  private category: Category;
  private count: number;

  constructor(solutionCart: CartItems) {
    super("minimum-category-count", solutionCart);

    const [itemId, solutionQuantity] = Array.from(solutionCart.entries())[0];

    this.category = Catalog.byId.get(itemId)!.attributes.category;

    // TODO: fix
    this.count = MathUtils.randomInt(1, solutionQuantity - 1);
  }

  public getLabel(): string {
    // TODO: fix pluralization
    return `Buy at least ${this.count} item${this.count > 1 ? "s" : ""} from '${this.category}'`;
  }

  public evaluate(cartItems: CartItems): boolean {
    const count = CartUtils.countByCategory(cartItems, this.category);

    return count >= this.count;
  }

  public getProgress(cartItems: CartItems): RuleProgress {
    return {
      current: String(CartUtils.countByCategory(cartItems, this.category)),
      target: String(this.count),
    };
  }
}
