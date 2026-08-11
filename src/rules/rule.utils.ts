import { CartItems, CartUtils, CatalogItem } from "../data";

export type ItemPredicate = (item: CatalogItem) => boolean;

const countMatchingItems = (
  cartItems: CartItems,
  matches: ItemPredicate,
): number =>
  Array.from(cartItems.keys()).filter((itemId) =>
    matches(CartUtils.getCatalogItem(itemId)),
  ).length;

const countDistinctCategories = (cartItems: CartItems): number =>
  new Set(
    Array.from(cartItems.keys()).map(
      (itemId) => CartUtils.getCatalogItem(itemId).attributes.category,
    ),
  ).size;

/**
 * A rule is only worth generating when the solution clears its own bar, so each
 * rule passes the predicate and minimum it needs.
 */
const solutionSupports = (
  solutionCart: CartItems,
  matches: ItemPredicate,
  minimum: number,
): boolean => countMatchingItems(solutionCart, matches) >= minimum;

export const RuleUtils = {
  countMatchingItems,
  countDistinctCategories,
  solutionSupports,
};
