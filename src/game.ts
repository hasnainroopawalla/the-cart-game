import { CartItems, CartUtils, Catalog } from "./data";
import { Rule, RULE_FACTORIES, RuleFactory, RuleFamily } from "./rules";
import { MathUtils } from "./utils";
import { GameConfig } from "./game.config";

export type GameRule = {
  definition: Rule;
  isSatisfied: boolean;
};

export type GameSnapshot = {
  rules: GameRule[];
};

export class Game {
  // set to -1 to account for rule evaluation when game starts (onMount).
  public moveCount: number = -1;

  private rules: GameRule[];

  constructor() {
    this.rules = this.generateRules();
  }

  public getSnapshot(): GameSnapshot {
    return { rules: this.rules };
  }

  public update(cartItems: CartItems): GameSnapshot {
    this.moveCount++;

    this.rules.forEach((rule) => {
      rule.isSatisfied = rule.definition.evaluate(cartItems);
    });

    return this.getSnapshot();
  }

  public isComplete(): boolean {
    return (
      this.rules.length > 0 && this.rules.every((entry) => entry.isSatisfied)
    );
  }

  private generateRules(): GameRule[] {
    const solutionCart = this.generateSolutionCart();

    return this.pickRuleFactories(solutionCart, GameConfig.ruleCount).map(
      (factory) => ({
        definition: factory.create(solutionCart),
        isSatisfied: false,
      }),
    );
  }

  private pickRuleFactories(
    solutionCart: CartItems,
    count: number,
  ): RuleFactory[] {
    const shuffled = MathUtils.shuffle(RULE_FACTORIES).filter(
      (factory) => factory.canApply?.(solutionCart) ?? true,
    );

    const usedFamilies = new Set<RuleFamily>();

    // One rule per family, so no family can take several slots on the board.
    const picked = shuffled.filter((factory) => {
      if (usedFamilies.has(factory.family)) return false;
      usedFamilies.add(factory.family);
      return true;
    });

    const remaining = shuffled.filter((factory) => !picked.includes(factory));

    return [...picked, ...remaining].slice(0, count);
  }

  private generateSolutionCart(): CartItems {
    let cart = this.sampleCart();

    for (
      let attempt = 1;
      attempt < GameConfig.maxSampleAttempts &&
      this.countCategories(cart) < GameConfig.minSolutionCategories;
      attempt++
    ) {
      cart = this.sampleCart();
    }

    return cart;
  }

  /** Sampled without replacement so the draw cannot stall on duplicates. */
  private sampleCart(): CartItems {
    const size = MathUtils.randomInt(
      GameConfig.solutionItemCount.min,
      GameConfig.solutionItemCount.max,
    );

    return new Map(
      MathUtils.shuffle(Catalog.items)
        .slice(0, size)
        .map((item) => [
          item.id,
          MathUtils.randomInt(
            GameConfig.solutionItemQuantity.min,
            GameConfig.solutionItemQuantity.max,
          ),
        ]),
    );
  }

  private countCategories(cartItems: CartItems): number {
    return new Set(
      Array.from(cartItems.keys()).map(
        (itemId) => CartUtils.getCatalogItem(itemId).attributes.category,
      ),
    ).size;
  }
}
