import type { CatalogItem } from "./types";

export const Categories = [
  "Fruits",
  "Vegetables",
  "Dairy",
  "Snacks",
  "Grains",
  "Drinks",
] as const;

const CATALOG_ITEMS = [
  {
    id: "cheese",
    name: "Cheese",
    emoji: "🧀",
    size: "200g",
    price: 120,
    attributes: {
      category: "Dairy",
      protein: 25,
      sugar: 10,
      isVegetarian: true,
    },
  },
  {
    id: "yogurt",
    name: "Yogurt",
    emoji: "🍶",
    size: "400g",
    price: 75,
    attributes: {
      category: "Dairy",
      protein: 9,
      sugar: 10,
      isVegetarian: true,
    },
  },
  {
    id: "potato",
    name: "Potato",
    emoji: "🥔",
    size: "1kg",
    price: 28,
    attributes: {
      category: "Vegetables",
      protein: 2,
      sugar: 10,
      isVegetarian: true,
    },
  },
  {
    id: "chicken",
    name: "Chicken",
    emoji: "🍗",
    size: "1kg",
    price: 210,
    attributes: {
      category: "Snacks",
      protein: 31,
      sugar: 10,
      isVegetarian: false,
    },
  },
  {
    id: "oats",
    name: "Oats",
    emoji: "🥣",
    size: "500g",
    price: 80,
    attributes: {
      category: "Grains",
      protein: 13,
      sugar: 10,
      isVegetarian: true,
    },
  },
  {
    id: "juice",
    name: "Orange Juice",
    emoji: "🧃",
    size: "1 L",
    price: 95,
    attributes: {
      category: "Drinks",
      protein: 1,
      sugar: 10,
      isVegetarian: true,
    },
  },
  {
    id: "chips",
    name: "Chips",
    emoji: "🍟",
    size: "150g",
    price: 40,
    attributes: {
      category: "Snacks",
      protein: 3,
      sugar: 10,
      isVegetarian: true,
    },
  },
] satisfies CatalogItem[];

export const Catalog = {
  items: CATALOG_ITEMS as CatalogItem[],
  byId: new Map<string, CatalogItem>(
    CATALOG_ITEMS.map((item) => [item.id, item]),
  ),
};
