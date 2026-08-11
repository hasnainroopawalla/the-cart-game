import { describe, expect, it } from "vitest";
import { CartUtils, NUMERIC_ATTRIBUTES, type CartItems } from "../../data";
import { TotalAttributeRule } from "../definitions/total-attribute-rule";
import { BudgetRangeRule } from "../definitions/budget-range-rule";
import { MinimumCategoryCountRule } from "../definitions/minimum-category-count-rule";
import { CountWithPredicateRule } from "../definitions/count-with-predicate-rule";
import { DiversityRule } from "../definitions/diversity-rule";
import { AveragePriceRule } from "../definitions/average-price-rule";
import { CartSizeRule } from "../definitions/cart-size-rule";
import {
  ATTRIBUTE_PAIRS,
  RelationalRule,
} from "../definitions/relational-rule";
import { RatioRule, RATIO_SUBJECTS } from "../definitions/ratio-rule";

const cartOf = (entries: [string, number][]): CartItems => new Map(entries);

/** Spans Grains, Dairy, Meat and Vegetables so category rules have room. */
const solutionCart = cartOf([
  ["lentils", 2],
  ["oats", 1],
  ["milk", 1],
  ["chicken", 1],
  ["spinach", 2],
]);

const emptyCart = cartOf([]);

describe("TotalAttributeRule", () => {
  it("is satisfied by the cart it was generated from", () => {
    for (const attribute of ["protein", "sugar", "calories"] as const) {
      const rule = new TotalAttributeRule(solutionCart, attribute);

      expect(rule.evaluate(solutionCart)).toBe(true);
    }
  });

  it("reports the cart total as progress", () => {
    const rule = new TotalAttributeRule(solutionCart, "protein");
    const { unit } = NUMERIC_ATTRIBUTES.protein;

    expect(rule.getProgress(solutionCart).current).toBe(
      `${CartUtils.sumAttribute(solutionCart, "protein")}${unit}`,
    );
  });

  it("fails an empty cart when more is better", () => {
    const rule = new TotalAttributeRule(solutionCart, "protein");

    expect(rule.evaluate(emptyCart)).toBe(false);
  });
});

describe("BudgetRangeRule", () => {
  it("accepts the solution total", () => {
    const rule = new BudgetRangeRule(solutionCart);

    expect(rule.evaluate(solutionCart)).toBe(true);
  });

  it("rejects a cart far outside the range", () => {
    const rule = new BudgetRangeRule(solutionCart);

    expect(rule.evaluate(cartOf([["mutton", 3]]))).toBe(false);
  });
});

describe("MinimumCategoryCountRule", () => {
  it("applies when a category has enough items", () => {
    expect(MinimumCategoryCountRule.canApply(solutionCart)).toBe(true);
  });

  it("does not apply when every category has one item", () => {
    expect(MinimumCategoryCountRule.canApply(cartOf([["milk", 5]]))).toBe(
      false,
    );
  });

  it("is satisfied by the solution cart", () => {
    const rule = new MinimumCategoryCountRule(solutionCart);

    expect(rule.evaluate(solutionCart)).toBe(true);
    expect(rule.evaluate(emptyCart)).toBe(false);
  });
});

describe("CountWithPredicateRule", () => {
  it("is satisfied by the solution cart when it applies", () => {
    for (const attribute of ["protein", "sugar", "calories"] as const) {
      if (!CountWithPredicateRule.canApply(solutionCart, attribute)) {
        continue;
      }

      const rule = new CountWithPredicateRule(solutionCart, attribute);

      expect(rule.evaluate(solutionCart)).toBe(true);
      expect(rule.evaluate(emptyCart)).toBe(false);
    }
  });

  it("does not apply when too few solution items clear the bar", () => {
    expect(
      CountWithPredicateRule.canApply(cartOf([["cola", 4]]), "protein"),
    ).toBe(false);
  });
});

describe("DiversityRule", () => {
  it("applies to a cart spanning several categories", () => {
    expect(DiversityRule.canApply(solutionCart)).toBe(true);
    expect(DiversityRule.canApply(cartOf([["milk", 3]]))).toBe(false);
  });

  it("is satisfied by the solution cart", () => {
    const rule = new DiversityRule(solutionCart);

    expect(rule.evaluate(solutionCart)).toBe(true);
    expect(rule.evaluate(emptyCart)).toBe(false);
  });
});

describe("AveragePriceRule", () => {
  it("accepts the solution average", () => {
    const rule = new AveragePriceRule(solutionCart);

    expect(rule.evaluate(solutionCart)).toBe(true);
  });

  it("rejects an empty cart rather than dividing by zero", () => {
    const rule = new AveragePriceRule(solutionCart);

    expect(rule.evaluate(emptyCart)).toBe(false);
    expect(rule.getProgress(emptyCart).current).toBe("₹0");
  });

  it("rejects a cart of expensive items", () => {
    const rule = new AveragePriceRule(solutionCart);

    expect(rule.evaluate(cartOf([["prawns", 1]]))).toBe(false);
  });
});

describe("CartSizeRule", () => {
  it("accepts the solution size and an empty cart", () => {
    const rule = new CartSizeRule(solutionCart);

    expect(rule.evaluate(solutionCart)).toBe(true);
    expect(rule.evaluate(emptyCart)).toBe(true);
  });

  it("rejects an oversized cart", () => {
    const rule = new CartSizeRule(solutionCart);

    expect(rule.evaluate(cartOf([["milk", 50]]))).toBe(false);
  });
});

describe("RelationalRule", () => {
  it("pairs a wanted attribute against an unwanted one of the same unit", () => {
    expect(ATTRIBUTE_PAIRS.length).toBeGreaterThan(0);

    for (const pair of ATTRIBUTE_PAIRS) {
      expect(NUMERIC_ATTRIBUTES[pair.greater].betterWhen).toBe("higher");
      expect(NUMERIC_ATTRIBUTES[pair.lesser].betterWhen).toBe("lower");
      expect(NUMERIC_ATTRIBUTES[pair.greater].unit).toBe(
        NUMERIC_ATTRIBUTES[pair.lesser].unit,
      );
    }
  });

  it("holds for a cart it applies to", () => {
    for (const pair of ATTRIBUTE_PAIRS) {
      if (!RelationalRule.canApply(solutionCart, pair)) {
        continue;
      }

      const rule = new RelationalRule(solutionCart, pair);

      expect(rule.evaluate(solutionCart)).toBe(true);
      // Both sides are zero, so neither beats the other.
      expect(rule.evaluate(emptyCart)).toBe(false);
    }
  });
});

describe("RatioRule", () => {
  it("is satisfied by the solution cart whenever it applies", () => {
    const applicable = RATIO_SUBJECTS.filter((subject) =>
      RatioRule.canApply(solutionCart, subject),
    );

    expect(applicable.length).toBeGreaterThan(0);

    for (const subject of applicable) {
      const rule = new RatioRule(solutionCart, subject);

      expect(rule.evaluate(solutionCart)).toBe(true);
      expect(rule.evaluate(emptyCart)).toBe(false);
    }
  });
});

describe("every rule", () => {
  it("produces a non-empty label", () => {
    const rules = [
      new TotalAttributeRule(solutionCart, "protein"),
      new BudgetRangeRule(solutionCart),
      new MinimumCategoryCountRule(solutionCart),
      new DiversityRule(solutionCart),
      new AveragePriceRule(solutionCart),
      new CartSizeRule(solutionCart),
    ];

    for (const rule of rules) {
      expect(rule.getLabel().length).toBeGreaterThan(0);
    }
  });
});
