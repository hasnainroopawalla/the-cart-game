import * as React from "react";
import { Game, type GameRule } from "../game";
import type { CartItems } from "../data";
import { RulePanelEntry } from "./rules-panel";

export const useGame = (cartItems: CartItems) => {
  const [game, setGame] = React.useState(() => new Game());

  const [snapshot, setSnapshot] = React.useState<{
    rules: RulePanelEntry[];
    hiddenRuleCount: number;
  }>({ rules: [], hiddenRuleCount: 0 });

  const toRulePanelEntry = React.useCallback(
    (rule: GameRule): RulePanelEntry => ({
      label: rule.definition.getLabel(),
      isSatisfied: rule.isSatisfied,
      ...rule.definition.getProgress(cartItems),
    }),
    [cartItems],
  );

  React.useEffect(() => {
    const { rules, hiddenRuleCount } = game.update(cartItems);

    setSnapshot({ rules: rules.map(toRulePanelEntry), hiddenRuleCount });
  }, [cartItems, game, toRulePanelEntry]);

  const reset = React.useCallback(() => setGame(new Game()), []);

  return {
    revealedRules: snapshot.rules,
    hiddenRuleCount: snapshot.hiddenRuleCount,
    reset,
  };
};
