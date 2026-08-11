import { describe, expect, it, vi } from "vitest";
import { MathUtils } from "../utils";

describe("MathUtils.randomInt", () => {
  it("returns the only value when the bounds are equal", () => {
    expect(MathUtils.randomInt(4, 4)).toBe(4);
  });

  it("stays within the inclusive bounds", () => {
    for (let i = 0; i < 200; i++) {
      const value = MathUtils.randomInt(2, 5);

      expect(value).toBeGreaterThanOrEqual(2);
      expect(value).toBeLessThanOrEqual(5);
    }
  });

  it("can return both bounds", () => {
    const seen = new Set<number>();

    for (let i = 0; i < 500; i++) {
      seen.add(MathUtils.randomInt(0, 1));
    }

    expect(seen).toEqual(new Set([0, 1]));
  });

  it("snaps to the step from the lower bound", () => {
    for (let i = 0; i < 200; i++) {
      const value = MathUtils.randomInt(10, 40, 10);

      expect([10, 20, 30, 40]).toContain(value);
    }
  });

  it("never exceeds the upper bound when the range is not a multiple of the step", () => {
    for (let i = 0; i < 200; i++) {
      expect(MathUtils.randomInt(0, 25, 10)).toBeLessThanOrEqual(25);
    }
  });
});

describe("MathUtils.floorTo", () => {
  it("rounds down to the nearest step", () => {
    expect(MathUtils.floorTo(47, 5)).toBe(45);
    expect(MathUtils.floorTo(45, 5)).toBe(45);
  });

  it("rounds away from zero for negatives", () => {
    expect(MathUtils.floorTo(-1, 5)).toBe(-5);
  });
});

describe("MathUtils.ceilTo", () => {
  it("rounds up to the nearest step", () => {
    expect(MathUtils.ceilTo(41, 5)).toBe(45);
    expect(MathUtils.ceilTo(45, 5)).toBe(45);
  });

  it("leaves zero untouched", () => {
    expect(MathUtils.ceilTo(0, 50)).toBe(0);
  });
});

describe("MathUtils.shuffle", () => {
  it("keeps every element", () => {
    const items = [1, 2, 3, 4, 5];

    expect(MathUtils.shuffle(items).sort()).toEqual(items);
  });

  it("does not mutate the input", () => {
    const items = [1, 2, 3, 4, 5];
    const copy = [...items];

    MathUtils.shuffle(items);

    expect(items).toEqual(copy);
  });

  it("is deterministic when every swap picks the first index", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);

    // swap(2,0) then swap(1,0).
    expect(MathUtils.shuffle([1, 2, 3])).toEqual([2, 3, 1]);

    vi.restoreAllMocks();
  });
});
