import * as React from "react";
import { CartItemsMap, CartPanel } from "./cart-panel";
import { CatalogPanel } from "./catalog-panel";
import { Header } from "./header";
import { RulesPanel } from "./rules-panel";

export function App() {
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

  return (
    <div className="bg-canvas min-h-screen text-neutral-900 antialiased lg:h-screen lg:min-h-0 lg:overflow-hidden">
      <div className="mx-auto flex max-w-300 flex-col px-6 py-6 lg:h-full">
        <Header />
        <main className="mt-5 grid min-h-0 flex-1 grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
          <div className="flex min-h-0 flex-col gap-5">
            <CatalogPanel
              addItemToCart={addItemToCart}
              getQuantityByItemId={getQuantityByItemId}
            />
            <CartPanel
              cartItems={cartItems}
              addItemToCart={addItemToCart}
              removeItemFromCart={removeItemFromCart}
              clearCart={clearCart}
            />
          </div>
          <RulesPanel />
        </main>
      </div>
    </div>
  );
}
