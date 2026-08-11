import { CartItems, NumericAttributes } from "../data";

export type NumericAttributeName = keyof NumericAttributes;

export type RuleProgress = {
  current?: string;
  target?: string;
};

/** Board slots are capped per family, so no family can crowd out the others. */
export type RuleFamily =
  | "total"
  | "count"
  | "budget"
  | "ratio"
  | "diversity"
  | "average"
  | "structure"
  | "relational";

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
