/** Inclusive of both bounds, snapped down to the nearest `step` from `min`. */
function randomInt(min: number, max: number, step = 1): number {
  const buckets = Math.floor((max - min) / step) + 1;
  return min + Math.floor(Math.random() * buckets) * step;
}

function floorTo(value: number, step: number): number {
  return Math.floor(value / step) * step;
}

function ceilTo(value: number, step: number): number {
  return Math.ceil(value / step) * step;
}

function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = MathUtils.randomInt(0, i);
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

export const MathUtils = {
  randomInt,
  floorTo,
  ceilTo,
  shuffle,
};
