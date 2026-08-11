import { describe, expect, it } from "vitest";
import { RuleUtils } from "../rule.utils";
import type { CartItems } from "../../data";

const cartOf = (entries: [string, number][]): CartItems => new Map(entries);

// Lentils/oats are Grains, milk is Dairy, chicken is Meat.
const mixedCart = cartOf([
  ["lentils", 2],
  ["oats", 1],
  ["milk", 1],
  ["chicken", 1],
]);

describe("RuleUtils.countMatchingItems", () => {
  it("counts distinct items rather than units", () => {
    expect(
      RuleUtils.countMatchingItems(mixedCart, () => true),
    ).toBe(mixedCart.size);
  });

  it("applies the predicate", () => {
    expect(
      RuleUtils.countMatchingItems(
        mixedCart,
        (item) => item.attributes.category === "Grains",
      ),
    ).toBe(2);
  });

  it("is zero for an empty cart", () => {
    expect(RuleUtils.countMatchingItems(cartOf([]), () => true)).toBe(0);
  });
});

describe("RuleUtils.countDistinctCategories", () => {
  it("ignores repeats of the same category", () => {
    expect(RuleUtils.countDistinctCategories(mixedCart)).toBe(3);
  });

  it("is zero for an empty cart", () => {
    expect(RuleUtils.countDistinctCategories(cartOf([]))).toBe(0);
  });
});

describe("RuleUtils.solutionSupports", () => {
  const isGrains = (item: { attributes: { category: string } }) =>
    item.attributes.category === "Grains";

  it("passes when the count meets the minimum", () => {
    expect(RuleUtils.solutionSupports(mixedCart, isGrains, 2)).toBe(true);
  });

  it("fails when the count is short", () => {
    expect(RuleUtils.solutionSupports(mixedCart, isGrains, 3)).toBe(false);
  });
});
