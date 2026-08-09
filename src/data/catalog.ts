import type { CatalogItem } from "./types";

export const Categories = [
  "All",
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
    attributes: { category: "Dairy", protein: 25, color: "yellow" },
  },
  {
    id: "yogurt",
    name: "Yogurt",
    emoji: "🍶",
    size: "400g",
    price: 75,
    attributes: { category: "Dairy", protein: 9, color: "white" },
  },
  {
    id: "potato",
    name: "Potato",
    emoji: "🥔",
    size: "1kg",
    price: 28,
    attributes: { category: "Vegetables", protein: 2, color: "brown" },
  },
  {
    id: "chicken",
    name: "Chicken",
    emoji: "🍗",
    size: "1kg",
    price: 210,
    attributes: { category: "Snacks", protein: 31, color: "brown" },
  },
  {
    id: "oats",
    name: "Oats",
    emoji: "🥣",
    size: "500g",
    price: 80,
    attributes: { category: "Grains", protein: 13, color: "brown" },
  },
  {
    id: "juice",
    name: "Orange Juice",
    emoji: "🧃",
    size: "1 L",
    price: 95,
    attributes: { category: "Drinks", protein: 1, color: "orange" },
  },
  {
    id: "chips",
    name: "Chips",
    emoji: "🍟",
    size: "150g",
    price: 40,
    attributes: { category: "Snacks", protein: 3, color: "yellow" },
  },
] satisfies CatalogItem[];

export const Catalog = {
  items: CATALOG_ITEMS as CatalogItem[],
  byId: new Map<string, CatalogItem>(
    CATALOG_ITEMS.map((item) => [item.id, item]),
  ),
};
