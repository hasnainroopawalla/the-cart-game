import type { ItemAttributes } from "./types";
import { RULES } from "./rules";

export { Catalog } from "./catalog";
export { RULES } from "./rules";
export type { CatalogItem, ItemAttributes, Rule, RuleStatus } from "./types";

export const CATEGORIES = [
  "All",
  "Fruits",
  "Vegetables",
  "Dairy",
  "Snacks",
  "Grains",
  "Drinks",
] as const;

export const GAME_STATE = {
  rulesSatisfied: 7,
  rulesTotal: 18,
  maxItems: 7,
  nextRuleIn: "00:48",
};

const RULE_ATTRIBUTES: Record<string, (keyof ItemAttributes)[]> = {
  protein: ["protein"],
  green: ["color"],
  grains: ["category"],
  fruits: ["category"],
  dairy: ["category"],
};

/** Only attributes some active rule depends on are worth showing on an item. */
export const RELEVANT_ATTRIBUTES = new Set(
  RULES.flatMap((rule) => RULE_ATTRIBUTES[rule.id] ?? []),
);

/** Attributes belonging to a rule that is currently unmet, so they decide the next move. */
export const CRITICAL_ATTRIBUTES = new Set(
  RULES.filter((rule) => rule.status === "failed").flatMap(
    (rule) => RULE_ATTRIBUTES[rule.id] ?? [],
  ),
);
