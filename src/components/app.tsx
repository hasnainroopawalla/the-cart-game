import { CartPanel } from "./cart-panel";
import { CatalogPanel } from "./catalog-panel";
import { Header } from "./header";
import { RulesPanel } from "./rules-panel";
import { useCartItems } from "./use-cart-items";

export function App() {
  const {
    cartItems,
    addItemToCart,
    removeItemFromCart,
    getQuantityByItemId,
    clearCart,
  } = useCartItems();

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
