import {
  Apple,
  Beef,
  Candy,
  Carrot,
  Cookie,
  CupSoda,
  Milk,
  Tag,
  Wheat,
} from "lucide-react";
import type { Category, NumericAttributes } from "../data";

const CATEGORY_ICON: Partial<Record<Category, React.ElementType>> = {
  Dairy: Milk,
  Vegetables: Carrot,
  Fruits: Apple,
  Grains: Wheat,
  Snacks: Cookie,
  Drinks: CupSoda,
};

export const getCategoryIcon = (category: Category): React.ElementType =>
  CATEGORY_ICON[category] ?? Tag;

export const NUMERIC_ATTRIBUTE_STYLE: Record<
  keyof NumericAttributes,
  { icon: React.ElementType; chipClass: string; textClass: string }
> = {
  protein: {
    icon: Beef,
    chipClass: "bg-amber-50 text-amber-700",
    textClass: "text-amber-700",
  },
  sugar: {
    icon: Candy,
    chipClass: "bg-rose-50/70 text-rose-700",
    textClass: "text-rose-700",
  },
};
