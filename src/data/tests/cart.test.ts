import { describe, expect, it } from "vitest";
import { Catalog, CartUtils, type CartItems } from "..";

const cartOf = (entries: [string, number][]): CartItems => new Map(entries);

describe("CartUtils.getCatalogItem", () => {
  it("returns the catalog item", () => {
    expect(CartUtils.getCatalogItem("lentils").name).toBe("Lentils");
  });

  it("throws for an unknown id", () => {
    expect(() => CartUtils.getCatalogItem("nope")).toThrow(
      "Unknown Item. [id=nope]",
    );
  });
});

describe("CartUtils.getTotal", () => {
  it("is zero for an empty cart", () => {
    expect(CartUtils.getTotal(cartOf([]))).toBe(0);
  });

  it("multiplies price by quantity", () => {
    const lentils = CartUtils.getCatalogItem("lentils");
    const milk = CartUtils.getCatalogItem("milk");

    expect(CartUtils.getTotal(cartOf([["lentils", 2], ["milk", 1]]))).toBe(
      lentils.price * 2 + milk.price,
    );
  });
});

describe("CartUtils.getItemCount", () => {
  it("counts units rather than distinct items", () => {
    expect(CartUtils.getItemCount(cartOf([["lentils", 3], ["milk", 2]]))).toBe(
      5,
    );
  });

  it("is zero for an empty cart", () => {
    expect(CartUtils.getItemCount(cartOf([]))).toBe(0);
  });
});

describe("CartUtils.countByCategory", () => {
  it("counts units in the category", () => {
    // Lentils are Grains, milk is Dairy.
    expect(
      CartUtils.countByCategory(
        cartOf([["lentils", 2], ["milk", 4]]),
        "Grains",
      ),
    ).toBe(2);
  });

  it("is zero when nothing matches", () => {
    expect(CartUtils.countByCategory(cartOf([["milk", 4]]), "Meat")).toBe(0);
  });
});

describe("CartUtils.sumAttribute", () => {
  it("weights the attribute by quantity", () => {
    const lentils = CartUtils.getCatalogItem("lentils");

    expect(CartUtils.sumAttribute(cartOf([["lentils", 3]]), "protein")).toBe(
      lentils.attributes.protein * 3,
    );
  });

  it("is zero for an empty cart", () => {
    expect(CartUtils.sumAttribute(cartOf([]), "calories")).toBe(0);
  });
});

describe("Catalog", () => {
  it("indexes every item by id", () => {
    expect(Catalog.byId.size).toBe(Catalog.items.length);
  });

  it("has no duplicate ids", () => {
    const ids = Catalog.items.map((item) => item.id);

    expect(new Set(ids).size).toBe(ids.length);
  });
});
