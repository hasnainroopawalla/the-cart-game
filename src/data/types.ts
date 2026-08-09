import { Categories } from "./catalog";

export type CartItems = Map<string /* itemId */, number /* quantity */>;

export type Category = (typeof Categories)[number];

export type NumericAttributes = {
  protein: number;
};

export type ItemAttributes = NumericAttributes & {
  category: Category;
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
