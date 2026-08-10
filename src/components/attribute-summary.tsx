import {
  NUMERIC_ATTRIBUTES,
  NUMERIC_ATTRIBUTE_NAMES,
  type ItemAttributes,
} from "../data";
import { NUMERIC_ATTRIBUTE_STYLE, getCategoryIcon } from "./attribute-style";

const AttributeChip = ({
  icon: Icon,
  title,
  className = "bg-neutral-100 text-neutral-600",
  children,
}: {
  icon?: React.ElementType;
  title: string;
  className?: string;
  children: React.ReactNode;
}) => (
  <span
    title={title}
    className={`inline-flex shrink-0 items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] leading-none font-medium ${className}`}
  >
    {Icon && <Icon className="h-3 w-3" />}
    {children}
  </span>
);

export const AttributeSummary = ({
  attributes,
  compact,
  className = "",
}: {
  attributes: ItemAttributes;
  compact?: boolean;
  className?: string;
}) => (
  // Display is left to the caller so it can hide the strip responsively.
  <div className={`flex-wrap items-center gap-1 ${className}`}>
    <AttributeChip
      icon={getCategoryIcon(attributes.category)}
      title={`Category: ${attributes.category}`}
    >
      {!compact && attributes.category}
    </AttributeChip>

    {NUMERIC_ATTRIBUTE_NAMES.map((name) => {
      const { label, unit } = NUMERIC_ATTRIBUTES[name];
      const { icon, chipClass } = NUMERIC_ATTRIBUTE_STYLE[name];

      return (
        <AttributeChip
          key={name}
          icon={icon}
          className={chipClass}
          title={`${label}: ${attributes[name]}${unit}`}
        >
          {attributes[name]}
          {unit}
        </AttributeChip>
      );
    })}
  </div>
);
