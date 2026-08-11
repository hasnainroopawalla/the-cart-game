import type { BooleanAttributes, NumericAttributes } from "./types";

export const NUMERIC_ATTRIBUTES: Record<
  keyof NumericAttributes,
  {
    label: string;
    unit: string;
    step: number;
    /** How far a generated target may sit from the solution, in multiples of `step`. */
    slackSteps: { min: number; max: number };
    /** Indicates whether higher or lower values are considered better. */
    betterWhen: "higher" | "lower";
  }
> = {
  protein: {
    label: "protein",
    unit: "g",
    step: 5,
    slackSteps: { min: 0, max: 2 },
    betterWhen: "higher",
  },
  sugar: {
    label: "sugar",
    unit: "g",
    step: 5,
    slackSteps: { min: 0, max: 2 },
    betterWhen: "lower",
  },
  calories: {
    label: "calories",
    unit: " kcal",
    step: 50,
    slackSteps: { min: 0, max: 1 },
    betterWhen: "lower",
  },
};

export const NUMERIC_ATTRIBUTE_NAMES = Object.keys(
  NUMERIC_ATTRIBUTES,
) as (keyof NumericAttributes)[];

export const BOOLEAN_ATTRIBUTES: Record<
  keyof BooleanAttributes,
  {
    label: string;
  }
> = {
  isVegetarian: {
    label: "vegetarian",
  },
};

export const BOOLEAN_ATTRIBUTE_NAMES = Object.keys(
  BOOLEAN_ATTRIBUTES,
) as (keyof BooleanAttributes)[];
