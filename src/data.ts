export type ItemAttributes = {
  brand: string;
  category: string;
  protein: number;
  addedSugar: boolean;
  color: "green" | "red" | "yellow" | "orange" | "brown" | "white";
};

export type CatalogItem = {
  id: string;
  name: string;
  emoji: string;
  size: string;
  price: number;
  attributes: ItemAttributes;
};

export type CartItem = CatalogItem & {
  quantity: number;
};

export type RuleStatus = "satisfied" | "failed" | "pending";

export type Rule = {
  id: string;
  label: string;
  status: RuleStatus;
  current?: string;
  target?: string;
};

export const CATEGORIES = [
  "All",
  "Fruits",
  "Vegetables",
  "Dairy",
  "Snacks",
  "Grains",
  "Drinks",
] as const;

export const CATALOG_ITEMS: CatalogItem[] = [
  {
    id: "cheese",
    name: "Cheese",
    emoji: "🧀",
    size: "200g",
    price: 120,
    attributes: {
      brand: "Amul",
      category: "Dairy",
      protein: 25,
      addedSugar: false,
      color: "yellow",
    },
  },
  {
    id: "yogurt",
    name: "Yogurt",
    emoji: "🍶",
    size: "400g",
    price: 75,
    attributes: {
      brand: "Epigamia",
      category: "Dairy",
      protein: 9,
      addedSugar: true,
      color: "white",
    },
  },
  {
    id: "potato",
    name: "Potato",
    emoji: "🥔",
    size: "1kg",
    price: 28,
    attributes: {
      brand: "Local",
      category: "Vegetables",
      protein: 2,
      addedSugar: false,
      color: "brown",
    },
  },
  //   { id: "tomato", name: "Tomato", emoji: "🍅", size: "1kg", price: 35 },
  {
    id: "chicken",
    name: "Chicken",
    emoji: "🍗",
    size: "1kg",
    price: 210,
    attributes: {
      brand: "Licious",
      category: "Snacks",
      protein: 31,
      addedSugar: false,
      color: "brown",
    },
  },
  {
    id: "oats",
    name: "Oats",
    emoji: "🥣",
    size: "500g",
    price: 80,
    attributes: {
      brand: "Quaker",
      category: "Grains",
      protein: 13,
      addedSugar: false,
      color: "brown",
    },
  },
  {
    id: "juice",
    name: "Orange Juice",
    emoji: "🧃",
    size: "1 L",
    price: 95,
    attributes: {
      brand: "Tropicana",
      category: "Drinks",
      protein: 1,
      addedSugar: true,
      color: "orange",
    },
  },
  {
    id: "chips",
    name: "Chips",
    emoji: "🍟",
    size: "150g",
    price: 40,
    attributes: {
      brand: "Lay's",
      category: "Snacks",
      protein: 3,
      addedSugar: false,
      color: "yellow",
    },
  },
];

export const RULES: Rule[] = [
  {
    id: "budget",
    label: "Spend between ₹500 and ₹800.",
    status: "satisfied",
    current: "₹635",
    // target: "₹500–₹800",
  },
  {
    id: "fruits",
    label: "Exactly 2 fruits.",
    status: "satisfied",
    current: "2",
    target: "2",
  },
  {
    id: "dairy",
    label: "Exactly 1 dairy item.",
    status: "satisfied",
    current: "1",
    target: "1",
  },
  {
    id: "max-items",
    label: "Maximum 7 items in the cart.",
    status: "satisfied",
    current: "6",
    target: "7",
  },
  { id: "brands", label: "No duplicate brands.", status: "satisfied" },
  {
    id: "protein",
    label: "Protein must be at least 25g.",
    status: "failed",
    current: "18g",
    target: "25g",
  },
  {
    id: "ends-with-5",
    label: "Total should end with 5.",
    status: "failed",
    current: "₹635",
  },
  {
    id: "grains",
    label: "Buy at least 1 item from the 'Grains' category.",
    status: "pending",
    current: "0",
    target: "1",
  },
  { id: "sugar", label: "Avoid items with added sugar.", status: "pending" },
  {
    id: "green",
    label: "Cart must include something green.",
    status: "pending",
  },
];

const RULE_ATTRIBUTES: Record<string, (keyof ItemAttributes)[]> = {
  brands: ["brand"],
  protein: ["protein"],
  sugar: ["addedSugar"],
  green: ["color"],
  grains: ["category"],
  fruits: ["category"],
  dairy: ["category"],
};

/** Only attributes some active rule depends on are worth showing on an item. */
export const RELEVANT_ATTRIBUTES = new Set(
  RULES.flatMap((rule) => RULE_ATTRIBUTES[rule.id] ?? []),
);

/** Attributes belonging to a rule that is currently unmet, so they decide the next move. */
export const CRITICAL_ATTRIBUTES = new Set(
  RULES.filter((rule) => rule.status === "failed").flatMap(
    (rule) => RULE_ATTRIBUTES[rule.id] ?? [],
  ),
);

export const GAME_STATE = {
  rulesSatisfied: 7,
  rulesTotal: 18,
  maxItems: 7,
  nextRuleIn: "00:48",
};

export const CART_ITEMS: CartItem[] = [
  { ...CATALOG_ITEMS[5], quantity: 4 },
  //   {
  //     id: "bread",
  //     name: "Bread",
  //     emoji: "🍞",
  //     meta: "Brown • 400g",
  //     price: 45,
  //     quantity: 1,
  //   },
  //   {
  //     id: "eggs",
  //     name: "Eggs",
  //     emoji: "🥚",
  //     meta: "Farm • 6pcs",
  //     price: 72,
  //     quantity: 1,
  //   },
  //   {
  //     id: "apple",
  //     name: "Apple",
  //     emoji: "🍎",
  //     meta: "Red • 4pcs",
  //     price: 80,
  //     quantity: 1,
  //   },
  //   {
  //     id: "banana",
  //     name: "Banana",
  //     emoji: "🍌",
  //     meta: "6pcs",
  //     price: 36,
  //     quantity: 1,
  //   },
  //   {
  //     id: "rice",
  //     name: "Rice",
  //     emoji: "🍚",
  //     meta: "1kg",
  //     price: 342,
  //     quantity: 1,
  //   },
  //   {
  //     id: "rice",
  //     name: "Rice",
  //     emoji: "🍚",
  //     meta: "1kg",
  //     price: 342,
  //     quantity: 1,
  //   },
  //   {
  //     id: "rice",
  //     name: "Rice",
  //     emoji: "🍚",
  //     meta: "1kg",
  //     price: 342,
  //     quantity: 1,
  //   },
  //   {
  //     id: "rice",
  //     name: "Rice",
  //     emoji: "🍚",
  //     meta: "1kg",
  //     price: 342,
  //     quantity: 1,
  //   },
  //   {
  //     id: "rice",
  //     name: "Rice",
  //     emoji: "🍚",
  //     meta: "1kg",
  //     price: 342,
  //     quantity: 1,
  //   },
  //   {
  //     id: "rice",
  //     name: "Rice",
  //     emoji: "🍚",
  //     meta: "1kg",
  //     price: 342,
  //     quantity: 1,
  //   },
];
