import type { Rule } from "./types";

export const RULES = [
  {
    id: "budget",
    label: "Spend between ₹500 and ₹800.",
    status: "satisfied",
    current: "₹635",
  },
  {
    id: "fruits",
    label: "Exactly 2 fruits.",
    status: "satisfied",
    current: "2",
    target: "2",
  },
  {
    id: "dairy",
    label: "Exactly 1 dairy item.",
    status: "satisfied",
    current: "1",
    target: "1",
  },
  {
    id: "max-items",
    label: "Maximum 7 items in the cart.",
    status: "satisfied",
    current: "6",
    target: "7",
  },
  {
    id: "protein",
    label: "Protein must be at least 25g.",
    status: "failed",
    current: "18g",
    target: "25g",
  },
  {
    id: "ends-with-5",
    label: "Total should end with 5.",
    status: "failed",
    current: "₹635",
  },
  {
    id: "grains",
    label: "Buy at least 1 item from the 'Grains' category.",
    status: "pending",
    current: "0",
    target: "1",
  },
  {
    id: "green",
    label: "Cart must include something green.",
    status: "pending",
  },
] satisfies Rule[];
