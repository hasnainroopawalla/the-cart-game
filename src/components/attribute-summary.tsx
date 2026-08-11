import cn from "classnames";
import {
  NUMERIC_ATTRIBUTES,
  NUMERIC_ATTRIBUTE_NAMES,
  type ItemAttributes,
} from "../data";
import { NUMERIC_ATTRIBUTE_STYLE, getCategoryIcon } from "./attribute-style";

const AttributeChip = ({
  icon: Icon,
  title,
  compact,
  className = "bg-neutral-100 text-neutral-600",
  children,
}: {
  icon?: React.ElementType;
  title: string;
  compact?: boolean;
  className?: string;
  children: React.ReactNode;
}) => (
  <span
    title={title}
    className={cn(
      "inline-flex shrink-0 items-center rounded-md leading-none font-medium",
      compact
        ? "gap-0.5 px-1 py-0.5 text-[10.5px]"
        : "gap-1 px-1.5 py-0.5 text-[11px]",
      className,
    )}
  >
    {Icon && <Icon className={compact ? "h-2.5 w-2.5" : "h-3 w-3"} />}
    {children}
  </span>
);

export const AttributeSummary = ({
  attributes,
  compact,
  className = "",
}: {
  attributes: ItemAttributes;
  /** Drops the category chip, leaving only the measured attributes. */
  compact?: boolean;
  className?: string;
}) => (
  <div className={cn("flex-wrap items-center gap-1", className)}>
    {!compact && (
      <AttributeChip
        icon={getCategoryIcon(attributes.category)}
        title={`Category: ${attributes.category}`}
      >
        {attributes.category}
      </AttributeChip>
    )}

    {NUMERIC_ATTRIBUTE_NAMES.map((name) => {
      const { label, unit } = NUMERIC_ATTRIBUTES[name];
      const { icon, chipClass } = NUMERIC_ATTRIBUTE_STYLE[name];

      return (
        <AttributeChip
          key={name}
          icon={icon}
          compact={compact}
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
