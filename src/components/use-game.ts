import * as React from "react";
import { Game, type GameRule } from "../game";
import type { CartItems } from "../data";
import { RulePanelEntry } from "./rules-panel";

export const useGame = (cartItems: CartItems) => {
  const [game, setGame] = React.useState(() => new Game());

  const [snapshot, setSnapshot] = React.useState<{
    rules: RulePanelEntry[];
  }>({ rules: [] });

  const toRulePanelEntry = React.useCallback(
    (rule: GameRule): RulePanelEntry => ({
      label: rule.definition.getLabel(),
      isSatisfied: rule.isSatisfied,
      ...rule.definition.getProgress(cartItems),
    }),
    [cartItems],
  );

  React.useEffect(() => {
    const { rules } = game.update(cartItems);
    setSnapshot({ rules: rules.map(toRulePanelEntry) });
  }, [cartItems, game, toRulePanelEntry]);

  const reset = React.useCallback(() => setGame(new Game()), []);

  return {
    rules: snapshot.rules,
    reset,
  };
};
