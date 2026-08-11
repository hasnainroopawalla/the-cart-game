import {
  Apple,
  Beef,
  Candy,
  Carrot,
  Cookie,
  CupSoda,
  Drumstick,
  Flame,
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
  Meat: Drumstick,
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
  calories: {
    icon: Flame,
    chipClass: "bg-emerald-50 text-emerald-700",
    textClass: "text-emerald-700",
  },
};

export const VegMark = ({
  isVegetarian,
  className = "h-3.5 w-3.5",
}: {
  isVegetarian: boolean;
  className?: string;
}) => {
  const label = isVegetarian ? "Vegetarian" : "Non-vegetarian";

  return (
    <span
      title={label}
      aria-label={label}
      role="img"
      className={`inline-flex shrink-0 items-center justify-center rounded-[3px] border ${className} ${
        isVegetarian
          ? "border-emerald-600 text-emerald-600"
          : "border-red-600 text-red-600"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
    </span>
  );
};
