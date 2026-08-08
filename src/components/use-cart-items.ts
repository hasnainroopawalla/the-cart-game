import * as React from "react";
import type { CartItemsMap } from "./cart-panel";

export const useCartItems = () => {
  const [cartItems, setCartItems] = React.useState<CartItemsMap>(new Map());

  const addItemToCart = React.useCallback(
    (itemId: string, quantity: number) => {
      setCartItems((prevItems) => {
        const nextItems = new Map(prevItems);
        const nextQuantity = (nextItems.get(itemId) ?? 0) + quantity;

        if (nextQuantity <= 0) {
          nextItems.delete(itemId);
        } else {
          nextItems.set(itemId, nextQuantity);
        }
        return nextItems;
      });
    },
    [],
  );

  const removeItemFromCart = React.useCallback((itemId: string) => {
    setCartItems((prevItems) => {
      const nextItems = new Map(prevItems);
      nextItems.delete(itemId);
      return nextItems;
    });
  }, []);

  const getQuantityByItemId = React.useCallback(
    (itemId: string) => {
      return cartItems.get(itemId) ?? 0;
    },
    [cartItems],
  );

  const clearCart = React.useCallback(() => {
    setCartItems(new Map());
  }, []);

  return {
    cartItems,
    addItemToCart,
    removeItemFromCart,
    getQuantityByItemId,
    clearCart,
  };
};
