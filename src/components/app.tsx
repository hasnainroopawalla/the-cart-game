import * as React from "react";
import { CartPanel } from "./cart-panel";
import { CatalogPanel } from "./catalog-panel";
import { Footer } from "./footer";
import { GameCompleteOverlay } from "./game-complete-overlay";
import { Header } from "./header";
import { ShoppingListPanel } from "./shopping-list-panel";
import { DebugSolutionPanel } from "./debug-panel";
import { useCartItems } from "./use-cart-items";
import { useGame } from "./use-game";
import { CartUtils } from "../data";
import { useElapsedTime } from "./use-elapsed-time";

export function App() {
  const [isSummaryDismissed, setIsSummaryDismissed] = React.useState(false);

  const {
    cartItems,
    addItemToCart,
    removeItemFromCart,
    getQuantityByItemId,
    clearCart,
  } = useCartItems();

  const { rules, isGameComplete, startNewGame, moveCount, solutionCart } =
    useGame(cartItems);

  const { getElapsedSeconds, restart: restartElapsedTime } = useElapsedTime();

  const onPlayAgain = React.useCallback(() => {
    startNewGame();
    clearCart();
    restartElapsedTime();
    setIsSummaryDismissed(false);
  }, [clearCart, startNewGame, restartElapsedTime]);

  return (
    <div className="bg-canvas min-h-screen text-neutral-900 antialiased lg:h-screen lg:min-h-0 lg:overflow-hidden">
      <div className="mx-auto flex max-w-400 flex-col px-6 py-6 lg:h-full">
        <Header startNewGame={onPlayAgain} />
        <main className="mt-5 grid min-h-0 flex-1 grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)_minmax(0,1fr)]">
          <ShoppingListPanel entries={rules} className="lg:order-last" />
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

      <DebugSolutionPanel solutionCart={solutionCart} />

      {isGameComplete && !isSummaryDismissed && (
        <GameCompleteOverlay
          moveCount={moveCount}
          itemCount={CartUtils.getItemCount(cartItems)}
          elapsedSeconds={getElapsedSeconds()}
          totalSpend={CartUtils.getTotal(cartItems)}
          onPlayAgain={onPlayAgain}
          onDismiss={() => setIsSummaryDismissed(true)}
        />
      )}
    </div>
  );
}
