import * as React from "react";
import { Game, type GameRule } from "../game";
import type { CartItems } from "../data";
import type { ShoppingListEntry } from "./shopping-list-panel";

export const useGame = (cartItems: CartItems) => {
  // Replaced rather than mutated, so the effect below sees a new dependency.
  const [game, setGame] = React.useState(() => new Game());

  const [isGameComplete, setIsGameComplete] = React.useState(() => false);

  const [snapshot, setSnapshot] = React.useState<{
    rules: ShoppingListEntry[];
  }>({ rules: [] });

  const toShoppingListEntry = React.useCallback(
    (rule: GameRule): ShoppingListEntry => ({
      label: rule.definition.getLabel(),
      isSatisfied: rule.isSatisfied,
      ...rule.definition.getProgress(cartItems),
    }),
    [cartItems],
  );

  React.useEffect(() => {
    const { rules } = game.update(cartItems);
    setSnapshot({ rules: rules.map(toShoppingListEntry) });
    setIsGameComplete(game.isComplete());
  }, [cartItems, game, toShoppingListEntry]);

  const startNewGame = React.useCallback(() => {
    setGame(new Game());
  }, []);

  return {
    rules: snapshot.rules,
    moveCount: game.moveCount,
    isGameComplete,
    startNewGame,
  };
};
