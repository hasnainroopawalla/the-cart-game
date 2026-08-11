import * as React from "react";
import { Game, type GameRule } from "../game";
import type { CartItems } from "../data";
import type { ShoppingListEntry } from "./shopping-list-panel";

export const useGame = (cartItems: CartItems) => {
  const [game, setGame] = React.useState(() => new Game());

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
  }, [cartItems, game, toShoppingListEntry]);

  const reset = React.useCallback(() => setGame(new Game()), []);

  return {
    rules: snapshot.rules,
    reset,
  };
};
