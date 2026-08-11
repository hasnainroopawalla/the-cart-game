import { CartItems, CartUtils, Categories, Category } from "../../data";
import { MathUtils } from "../../utils";
import { Rule, type RuleProgress } from "../rule";
import { RuleUtils } from "../rule.utils";

/** One item of the category is a target the player meets without trying. */
const MIN_SOLUTION_ITEMS_IN_CATEGORY = 2;

const MIN_TARGET_COUNT = 1;

const qualifies = (solutionCart: CartItems, category: Category): boolean =>
  RuleUtils.solutionSupports(
    solutionCart,
    (item) => item.attributes.category === category,
    MIN_SOLUTION_ITEMS_IN_CATEGORY,
  );

export class MinimumCategoryCountRule extends Rule {
  private category: Category;
  private count: number;

  public static canApply(solutionCart: CartItems): boolean {
    return Categories.some((category) => qualifies(solutionCart, category));
  }

  constructor(solutionCart: CartItems) {
    super("minimum-category-count", solutionCart);

    this.category = MathUtils.shuffle(Categories).find((category) =>
      qualifies(solutionCart, category),
    )!;

    this.count = MathUtils.randomInt(
      MIN_TARGET_COUNT,
      CartUtils.countByCategory(solutionCart, this.category),
    );
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
