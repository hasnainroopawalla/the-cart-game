import {
  Milk,
  Carrot,
  Apple,
  Wheat,
  Cookie,
  CupSoda,
  Tag,
  Beef,
} from "lucide-react";
import { type ItemAttributes } from "../../data";

const COLOR_DOT: Record<ItemAttributes["color"], string> = {
  green: "bg-emerald-500",
  red: "bg-red-500",
  yellow: "bg-amber-400",
  orange: "bg-orange-400",
  brown: "bg-amber-700",
  white: "bg-neutral-300",
};

const CATEGORY_ICON: Record<string, React.ElementType> = {
  Dairy: Milk,
  Vegetables: Carrot,
  Fruits: Apple,
  Grains: Wheat,
  Snacks: Cookie,
  Drinks: CupSoda,
};

const AttributeChip = ({
  icon: Icon,
  critical,
  title,
  children,
}: {
  icon?: React.ElementType;
  critical?: boolean;
  title: string;
  children: React.ReactNode;
}) => (
  <span
    title={title}
    className={`inline-flex shrink-0 items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] leading-none font-medium ${
      critical
        ? "bg-amber-50 text-amber-700"
        : "bg-neutral-100 text-neutral-600"
    }`}
  >
    {Icon && <Icon className="h-3 w-3" />}
    {children}
  </span>
);

export const AttributeSummary = ({
  attributes,
}: {
  attributes: ItemAttributes;
}) => (
  <div className="hidden items-center gap-1 sm:flex">
    <AttributeChip
      icon={CATEGORY_ICON[attributes.category] ?? Tag}
      title={`Category: ${attributes.category}`}
    >
      {attributes.category}
    </AttributeChip>
    <AttributeChip icon={Beef} title={`Protein: ${attributes.protein}g`}>
      {attributes.protein}g
    </AttributeChip>
    <span
      title={`Colour: ${attributes.color}`}
      className={`h-2.5 w-2.5 shrink-0 rounded-full ring-1 ring-black/10 ${COLOR_DOT[attributes.color]}`}
    />
  </div>
);
