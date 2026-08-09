import * as React from "react";
import { Game, type GameRule } from "../game";
import type { CartItems } from "../data";
import { RulePanelEntry } from "./rules-panel";

export const useGame = (cartItems: CartItems) => {
  const [game, setGame] = React.useState(() => new Game());

  const [revealedRules, setRevealedRules] = React.useState<RulePanelEntry[]>(
    [],
  );

  const toRulePanelEntry = React.useCallback(
    (rule: GameRule): RulePanelEntry => ({
      label: rule.definition.getLabel(),
      isSatisfied: rule.isSatisfied,
      ...rule.definition.getProgress(cartItems),
    }),
    [cartItems],
  );

  React.useEffect(() => {
    if (game.evaluateRevealedRules(cartItems)) {
      game.revealNextRule();
    }

    setRevealedRules(game.getVisibleRules().map(toRulePanelEntry));
  }, [cartItems, game, toRulePanelEntry]);

  return {
    revealedRules,
    reset: () => setGame(new Game()),
  };
};
