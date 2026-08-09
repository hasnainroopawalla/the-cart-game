import type { NumericAttributes } from "./types";

export const ATTRIBUTE_META: Record<
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
    unit: "g",
    step: 5,
    label: "protein",
    slackSteps: { min: 1, max: 6 },
  },
};
