import type { NumericAttributes } from "./types";

export const ATTRIBUTE_META: Record<
  keyof NumericAttributes,
  {
    unit: string;
    step: number;
    label: string;
  }
> = {
  protein: { unit: "g", step: 5, label: "protein" },
};
