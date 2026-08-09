export const MathUtils = {
  /** Inclusive of both bounds, snapped down to the nearest `step` from `min`. */
  randomInt: (min: number, max: number, step = 1): number => {
    const buckets = Math.floor((max - min) / step) + 1;
    return min + Math.floor(Math.random() * buckets) * step;
  },
};
