import { CartItems } from "../data";
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

// const RULES = [
//   {
//     id: "budget-range",
//     label: "Spend between ₹500 and ₹800.",
//     evaluate: () => {},
//   },
//   {
//     id: "total-ends-with-5",
//     label: "Total should end with 5.",
//   },
//   {
//     id: "exact-category-count",
//     label: "Exactly 2 fruits.",
//   },
//   {
//     id: "cart-max-items",
//     label: "Maximum 7 items in the cart.",
//   },
//   {
//     id: "protein-amount",
//     label: "Protein must be at least 25g.",
//   },
//   {
//     id: "product-color",
//     label: "Cart must include something green.",
//   },
// ] satisfies Rule[];
