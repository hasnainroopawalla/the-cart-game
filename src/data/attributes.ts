import type { NumericAttributes } from "./types";

export const NUMERIC_ATTRIBUTES: Record<
  keyof NumericAttributes,
  {
    unit: string;
    step: number;
    label: string;
    /** How far a generated target may sit from the solution, in multiples of `step`. */
    slackSteps: { min: number; max: number };
  }
> = {
  protein: {
    label: "protein",
    unit: "g",
    step: 5,
    slackSteps: { min: 1, max: 6 },
  },
  sugar: {
    label: "sugar",
    unit: "g",
    step: 5,
    slackSteps: { min: 1, max: 6 },
  },
};

export const NUMERIC_ATTRIBUTE_NAMES = Object.keys(
  NUMERIC_ATTRIBUTES,
) as (keyof NumericAttributes)[];
