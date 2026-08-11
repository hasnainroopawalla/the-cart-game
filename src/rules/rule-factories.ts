import { TotalAttributeRule } from "./definitions/total-attribute-rule";
import { BudgetRangeRule } from "./definitions/budget-range-rule";
import { MinimumCategoryCountRule } from "./definitions/minimum-category-count-rule";
import { CountWithPredicateRule } from "./definitions/count-with-predicate-rule";
import { RatioRule, RATIO_SUBJECTS } from "./definitions/ratio-rule";
import { DiversityRule } from "./definitions/diversity-rule";
import { AveragePriceRule } from "./definitions/average-price-rule";
import { CartSizeRule } from "./definitions/cart-size-rule";
import { RelationalRule, ATTRIBUTE_PAIRS } from "./definitions/relational-rule";

import { NUMERIC_ATTRIBUTE_NAMES, CartItems } from "../data";
import { Rule, type RuleFamily } from "./rule";

export type RuleFactory = {
  family: RuleFamily;
  /** Rules whose target the solution cart could not meet are skipped. */
  canApply?: (solutionCart: CartItems) => boolean;
  create: (solutionCart: CartItems) => Rule;
};

export const RULE_FACTORIES: RuleFactory[] = [
  {
    family: "count",
    canApply: (cart) => MinimumCategoryCountRule.canApply(cart),
    create: (cart) => new MinimumCategoryCountRule(cart),
  },
  {
    family: "budget",
    create: (cart) => new BudgetRangeRule(cart),
  },
  {
    family: "diversity",
    canApply: (cart) => DiversityRule.canApply(cart),
    create: (cart) => new DiversityRule(cart),
  },
  {
    family: "average",
    create: (cart) => new AveragePriceRule(cart),
  },
  {
    family: "structure",
    create: (cart) => new CartSizeRule(cart),
  },
  ...NUMERIC_ATTRIBUTE_NAMES.map((attribute) => ({
    family: "total" as const,
    create: (cart: CartItems) => new TotalAttributeRule(cart, attribute),
  })),
  ...NUMERIC_ATTRIBUTE_NAMES.map((attribute) => ({
    family: "count" as const,
    canApply: (cart: CartItems) =>
      CountWithPredicateRule.canApply(cart, attribute),
    create: (cart: CartItems) => new CountWithPredicateRule(cart, attribute),
  })),
  ...RATIO_SUBJECTS.map((subject) => ({
    family: "ratio" as const,
    canApply: (cart: CartItems) => RatioRule.canApply(cart, subject),
    create: (cart: CartItems) => new RatioRule(cart, subject),
  })),
  ...ATTRIBUTE_PAIRS.map((pair) => ({
    family: "relational" as const,
    canApply: (cart: CartItems) => RelationalRule.canApply(cart, pair),
    create: (cart: CartItems) => new RelationalRule(cart, pair),
  })),
];
