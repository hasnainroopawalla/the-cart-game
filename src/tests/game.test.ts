import { describe, expect, it } from "vitest";
import { Game } from "../game";

describe("Game", () => {
  it("deals a board whose solution cart satisfies every rule", () => {
    // Sampling is random, so the promise is checked across many boards.
    for (let attempt = 0; attempt < 200; attempt++) {
      const game = new Game();
      const { rules } = game.update(game.getSolutionCart());

      expect(rules.every((rule) => rule.isSatisfied)).toBe(true);
      expect(game.isComplete()).toBe(true);
    }
  });

  it("hands out a copy of the solution cart", () => {
    const game = new Game();

    game.getSolutionCart().clear();

    expect(game.getSolutionCart().size).toBeGreaterThan(0);
  });
});
