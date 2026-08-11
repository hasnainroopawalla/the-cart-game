import {
  NUMERIC_ATTRIBUTES,
  NUMERIC_ATTRIBUTE_NAMES,
  CartItems,
  CartUtils,
} from "../../data";
import { Rule, type NumericAttributeName, type RuleProgress } from "../rule";

export type AttributePair = {
  greater: NumericAttributeName;
  lesser: NumericAttributeName;
};

/** Only same-unit pairs compare meaningfully, and the wanted one has to be the greater side. */
export const ATTRIBUTE_PAIRS: AttributePair[] = NUMERIC_ATTRIBUTE_NAMES.flatMap(
  (greater) =>
    NUMERIC_ATTRIBUTE_NAMES.filter(
      (lesser) =>
        lesser !== greater &&
        NUMERIC_ATTRIBUTES[greater].unit === NUMERIC_ATTRIBUTES[lesser].unit &&
        NUMERIC_ATTRIBUTES[greater].betterWhen === "higher" &&
        NUMERIC_ATTRIBUTES[lesser].betterWhen === "lower",
    ).map((lesser) => ({ greater, lesser })),
);

export class RelationalRule extends Rule {
  private pair: AttributePair;

  /** No threshold to tune, so the rule is only usable when the solution already holds it. */
  public static canApply(
    solutionCart: CartItems,
    pair: AttributePair,
  ): boolean {
    return (
      CartUtils.sumAttribute(solutionCart, pair.greater) >
      CartUtils.sumAttribute(solutionCart, pair.lesser)
    );
  }

  constructor(solutionCart: CartItems, pair: AttributePair) {
    super(`relational-${pair.greater}-${pair.lesser}`, solutionCart);

    this.pair = pair;
  }

  public getLabel(): string {
    const { label: greater } = NUMERIC_ATTRIBUTES[this.pair.greater];
    const { label: lesser } = NUMERIC_ATTRIBUTES[this.pair.lesser];

    return `Total ${greater} must beat total ${lesser}`;
  }

  public evaluate(cartItems: CartItems): boolean {
    return (
      CartUtils.sumAttribute(cartItems, this.pair.greater) >
      CartUtils.sumAttribute(cartItems, this.pair.lesser)
    );
  }

  public getProgress(cartItems: CartItems): RuleProgress {
    const { unit } = NUMERIC_ATTRIBUTES[this.pair.greater];

    return {
      current: `${CartUtils.sumAttribute(cartItems, this.pair.greater)}${unit}`,
      target: `${CartUtils.sumAttribute(cartItems, this.pair.lesser)}${unit}`,
    };
  }
}
