export const GameConfig = {
  /** How many rules a round puts on the board. */
  ruleCount: 6,

  /** Distinct items in the generated solution, kept independent of catalog size. */
  solutionItemCount: { min: 5, max: 8 },

  solutionItemQuantity: { min: 1, max: 3 },

  /** Categories the solution must span before category rules are worth generating. */
  minSolutionCategories: 3,

  maxSampleAttempts: 20,
};
