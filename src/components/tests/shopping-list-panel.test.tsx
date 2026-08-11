import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  ShoppingListPanel,
  type ShoppingListEntry,
} from "../shopping-list-panel";

const entries: ShoppingListEntry[] = [
  {
    label: "At least 70g of protein",
    isSatisfied: true,
    current: "86g",
    target: "70g",
  },
  { label: "Spend between ₹300 and ₹400", isSatisfied: false, current: "₹120" },
  { label: "Items from at least 3 different categories", isSatisfied: false },
];

describe("ShoppingListPanel", () => {
  it("renders every entry", () => {
    render(<ShoppingListPanel entries={entries} />);

    for (const entry of entries) {
      expect(screen.getByText(entry.label)).toBeInTheDocument();
    }
  });

  it("counts the satisfied entries", () => {
    render(<ShoppingListPanel entries={entries} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("/ 3")).toBeInTheDocument();
  });

  it("shows progress only when the entry reports it", () => {
    render(<ShoppingListPanel entries={entries} />);

    expect(screen.getByText("86g")).toBeInTheDocument();
    expect(screen.getByText("70g")).toBeInTheDocument();
    expect(screen.getByText("₹120")).toBeInTheDocument();
  });

  it("marks satisfied entries as done", () => {
    render(<ShoppingListPanel entries={entries} />);

    expect(screen.getByText(entries[0].label)).toHaveClass("line-through");
    expect(screen.getByText(entries[1].label)).not.toHaveClass("line-through");
  });
});
