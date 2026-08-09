import { Catalog } from "./catalog";
import type {
  CartItems,
  CatalogItem,
  Category,
  NumericAttributes,
} from "./types";

function getCatalogItem(itemId: string): CatalogItem {
  const item = Catalog.byId.get(itemId);

  if (!item) {
    // TODO: move to error class
    throw new Error(`Unknown Item. [id=${itemId}]`);
  }

  return item;
}

function getTotal(cartItems: CartItems): number {
  return Array.from(cartItems.entries()).reduce((acc, [itemId, quantity]) => {
    const item = getCatalogItem(itemId);

    return acc + item.price * quantity;
  }, 0);
}

function getItemCount(cartItems: CartItems): number {
  return Array.from(cartItems.values()).reduce(
    (acc, quantity) => acc + quantity,
    0,
  );
}

function countByCategory(cartItems: CartItems, category: Category): number {
  return Array.from(cartItems.entries()).reduce((acc, [itemId, quantity]) => {
    const item = getCatalogItem(itemId);

    if (item.attributes.category === category) {
      return acc + quantity;
    }
    return acc;
  }, 0);
}

function sumAttribute(
  cartItems: CartItems,
  attribute: keyof NumericAttributes,
) {
  return Array.from(cartItems.entries()).reduce((acc, [itemId, quantity]) => {
    const item = getCatalogItem(itemId);

    if (item.attributes[attribute] !== undefined) {
      return acc + item.attributes[attribute] * quantity;
    }

    return acc;
  }, 0);
}

export const CartUtils = {
  getCatalogItem,
  getTotal,
  countByCategory,
  getItemCount,
  sumAttribute,
};
