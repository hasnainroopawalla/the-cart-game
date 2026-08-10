import { Categories } from "./catalog";

export type CartItems = Map<string /* itemId */, number /* quantity */>;

export type Category = (typeof Categories)[number];

export type NumericAttributes = {
  protein: number;
  sugar: number;
};

export type ItemAttributes = NumericAttributes & {
  category: Category;
};

export type CatalogItem = {
  id: string;
  name: string;
  emoji: string;
  size: string;
  price: number;
  attributes: ItemAttributes;
};
