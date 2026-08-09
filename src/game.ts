import { CartItems, Catalog, Categories, Category } from "./data";
import { Rule, RULE_FACTORIES } from "./rules";
import { MathUtils } from "./utils";

export type GameRule = {
  definition: Rule;
  isSatisfied: boolean;
  revealedAtIndex: number | null; // nth rule revealed, null if not yet
};

export class Game {
  private rules: GameRule[];
  private currentRuleIndex = 0;

  constructor() {
    this.rules = this.generateRules();
    this.revealRule(0);
  }

  public getVisibleRules(): GameRule[] {
    return this.rules
      .filter((rule) => rule.revealedAtIndex !== null)
      .sort((a, b) => b.revealedAtIndex! - a.revealedAtIndex!);
  }

  public evaluateRevealedRules(cartItems: CartItems): boolean {
    return this.rules.every((rule) => {
      if (rule.revealedAtIndex === null) {
        return true;
      }

      rule.isSatisfied = rule.definition.evaluate(cartItems);

      return rule.isSatisfied;
    });
  }

  public revealNextRule(): void {
    const nextIndex = this.currentRuleIndex + 1;
    if (nextIndex < this.rules.length) {
      this.revealRule(nextIndex);
    }
  }

  private generateRules(): GameRule[] {
    const solutionCart = this.generateSolutionCart();

    const rules = RULE_FACTORIES.map((createRule) => ({
      definition: createRule(solutionCart),
      isSatisfied: false,
      revealedAtIndex: null,
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

  private revealRule(index: number): void {
    this.currentRuleIndex = index;
    this.rules[index].revealedAtIndex = index;
  }
}
