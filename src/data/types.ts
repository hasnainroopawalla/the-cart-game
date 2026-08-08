export type ItemAttributes = {
  category: string;
  protein: number;
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

export type RuleStatus = "satisfied" | "failed" | "pending";

export type Rule = {
  id: string;
  label: string;
  status: RuleStatus;
  current?: string;
  target?: string;
};
