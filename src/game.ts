import { CartItems, Catalog, Categories, Category } from "./data";
import { Rule, RULE_FACTORIES } from "./rules";
import { MathUtils } from "./utils";

export type GameRule = {
  definition: Rule;
  isSatisfied: boolean;
};

export type GameSnapshot = {
  rules: GameRule[];
  hiddenRuleCount: number;
};

export class Game {
  private rules: GameRule[];
  private revealedCount = 1;

  constructor() {
    this.rules = this.generateRules();
  }

  public getSnapshot(): GameSnapshot {
    return {
      rules: this.rules.slice(0, this.revealedCount).reverse(),
      hiddenRuleCount: this.rules.length - this.revealedCount,
    };
  }

  /** Keeps revealing while the cart satisfies everything on the board. */
  public update(cartItems: CartItems): GameSnapshot {
    while (
      this.evaluateRevealedRules(cartItems) &&
      this.revealedCount < this.rules.length
    ) {
      this.revealedCount++;
    }

    return this.getSnapshot();
  }

  private evaluateRevealedRules(cartItems: CartItems): boolean {
    return this.rules
      .slice(0, this.revealedCount)
      .every(
        (rule) => (rule.isSatisfied = rule.definition.evaluate(cartItems)),
      );
  }

  private generateRules(): GameRule[] {
    const solutionCart = this.generateSolutionCart();

    const rules = RULE_FACTORIES.map((createRule) => ({
      definition: createRule(solutionCart),
      isSatisfied: false,
    }));

    return MathUtils.shuffle(rules);
  }

  private generateSolutionCart(): CartItems {
    const solutionCart: CartItems = new Map();

    const cartItemsCount = MathUtils.randomInt(5, Catalog.items.length - 1);

    const seenCategories = new Set<Category>(Categories);

    while (seenCategories.size > 0 && solutionCart.size < cartItemsCount) {
      const item =
        Catalog.items[MathUtils.randomInt(0, Catalog.items.length - 1)];

      if (solutionCart.has(item.id)) {
        continue;
      }

      seenCategories.delete(item.attributes.category);

      solutionCart.set(item.id, /* itemQuantity */ MathUtils.randomInt(1, 4));
    }

    return solutionCart;
  }
}
