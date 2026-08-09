import { TotalAttributeRule } from "./total-attribute-rule";
import { BudgetRangeRule } from "./budget-range-rule";
import { MinimumCategoryCountRule } from "./minimum-category-count-rule";
import { ItemAttributeLimitRule } from "./item-attribute-limit-rule";

import { ATTRIBUTE_META, CartItems, NumericAttributes } from "../data";
import { Rule } from "./rule";

type RuleFactory = (solutionCart: CartItems) => Rule;

const attributeNames = Object.keys(
  ATTRIBUTE_META,
) as (keyof NumericAttributes)[];

const totalAttributeRuleFactories: RuleFactory[] = attributeNames.map(
  (attribute) => (solutionCart) =>
    new TotalAttributeRule(solutionCart, attribute),
);

const itemAttributeLimitRuleFactories: RuleFactory[] = attributeNames.map(
  (attribute) => (solutionCart) =>
    new ItemAttributeLimitRule(solutionCart, attribute),
);

export const RULE_FACTORIES: RuleFactory[] = [
  (solutionCart) => new MinimumCategoryCountRule(solutionCart),
  (solutionCart) => new BudgetRangeRule(solutionCart),
  ...totalAttributeRuleFactories,
  ...itemAttributeLimitRuleFactories,
];
