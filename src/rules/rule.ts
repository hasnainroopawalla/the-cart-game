import { CartItems, NumericAttributes } from "../data";

export type AttributeName = keyof NumericAttributes;

export type RuleProgress = {
  current?: string;
  target?: string;
};

export abstract class Rule {
  public readonly id: string;
  public readonly solutionCart: CartItems;

  constructor(id: string, solutionCart: CartItems) {
    this.id = id;
    this.solutionCart = solutionCart;
  }

  public abstract evaluate(cartItems: CartItems): boolean;

  public abstract getLabel(): string;

  public abstract getProgress(cartItems: CartItems): RuleProgress;
}
