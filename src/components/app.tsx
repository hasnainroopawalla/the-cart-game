import { CartPanel } from "./cart-panel";
import { CatalogPanel } from "./catalog-panel";
import { Footer } from "./footer";
import { Header } from "./header";
import { RulesPanel } from "./rules-panel";
import { useCartItems } from "./use-cart-items";
import { useGame } from "./use-game";

export function App() {
  const {
    cartItems,
    addItemToCart,
    removeItemFromCart,
    getQuantityByItemId,
    clearCart,
  } = useCartItems();

  const { rules } = useGame(cartItems);

  // TODO: Implement start new game functionality
  return (
    <div className="bg-canvas min-h-screen text-neutral-900 antialiased lg:h-screen lg:min-h-0 lg:overflow-hidden">
      <div className="mx-auto flex max-w-400 flex-col px-6 py-6 lg:h-full">
        <Header startNewGame={() => {}} />
        <main className="mt-5 grid min-h-0 flex-1 grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)_minmax(0,1fr)]">
          <RulesPanel rules={rules} className="lg:order-last" />
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
        </main>
        <Footer />
      </div>
    </div>
  );
}
