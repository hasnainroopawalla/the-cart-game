import * as React from "react";
import {
  NUMERIC_ATTRIBUTES,
  type ItemAttributes,
  type NumericAttributes,
} from "../data";
import { Info, Shapes } from "lucide-react";
import {
  NUMERIC_ATTRIBUTE_STYLE,
  VegMark,
  getCategoryIcon,
} from "./attribute-style";

const PANEL_WIDTH = 224;
const ESTIMATED_PANEL_HEIGHT = 180;
const VIEWPORT_MARGIN = 8;

const ATTRIBUTE_ROWS: {
  key: keyof ItemAttributes;
  label: string;
  className: string;
  icon: React.ElementType;
  /** Sits beside the value when the value itself has an icon. */
  getValueIcon?: (attributes: ItemAttributes) => React.ElementType;
  render: (attributes: ItemAttributes) => React.ReactNode;
}[] = [
  {
    key: "category",
    label: "Category",
    className: "text-neutral-800",
    icon: Shapes,
    getValueIcon: (a) => getCategoryIcon(a.category),
    render: (a) => a.category,
  },
  ...Object.entries(NUMERIC_ATTRIBUTES).map(([key, { label, unit }]) => {
    const attribute = key as keyof NumericAttributes;
    const { icon, textClass } = NUMERIC_ATTRIBUTE_STYLE[attribute];

    return {
      key: attribute,
      label,
      className: textClass,
      icon,
      render: (a: ItemAttributes) => `${a[attribute]}${unit}`,
    };
  }),
];

export const ItemInfoButton = ({
  name,
  attributes,
  className = "h-4 w-4",
}: {
  name: string;
  attributes: ItemAttributes;
  className?: string;
}) => {
  const panelId = React.useId();
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) {
      return;
    }

    // The panel is placed from a measured rect, so any scroll invalidates it.
    const dismiss = () => panelRef.current?.hidePopover();
    window.addEventListener("scroll", dismiss, true);
    window.addEventListener("resize", dismiss);

    return () => {
      window.removeEventListener("scroll", dismiss, true);
      window.removeEventListener("resize", dismiss);
    };
  }, [open]);

  const rows = ATTRIBUTE_ROWS;

  if (rows.length === 0) {
    return null;
  }

  // Positioned imperatively so the top-layer panel paints in place on the first frame.
  const onBeforeToggle = (event: React.ToggleEvent<HTMLDivElement>) => {
    setOpen(event.newState === "open");

    const trigger = triggerRef.current;
    const panel = panelRef.current;
    if (event.newState !== "open" || !trigger || !panel) {
      return;
    }

    const rect = trigger.getBoundingClientRect();
    const flipAbove = rect.bottom + ESTIMATED_PANEL_HEIGHT > window.innerHeight;

    panel.style.left = `${Math.min(
      Math.max(VIEWPORT_MARGIN, rect.right - PANEL_WIDTH),
      window.innerWidth - PANEL_WIDTH - VIEWPORT_MARGIN,
    )}px`;
    panel.style.top = flipAbove ? "" : `${rect.bottom + VIEWPORT_MARGIN}px`;
    panel.style.bottom = flipAbove
      ? `${window.innerHeight - rect.top + VIEWPORT_MARGIN}px`
      : "";
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        popoverTarget={panelId}
        aria-label={`Details for ${name}`}
        className={`inline-flex shrink-0 items-center justify-center rounded-full transition ${className} ${
          open ? "text-neutral-800" : "text-neutral-400 hover:text-neutral-700"
        }`}
      >
        <Info className="h-3.5 w-3.5" />
      </button>

      <div
        ref={panelRef}
        id={panelId}
        popover="auto"
        onBeforeToggle={onBeforeToggle}
        aria-label={`${name} details`}
        style={{ width: PANEL_WIDTH }}
        className="fixed inset-auto m-0 rounded-xl border border-neutral-200 bg-white p-3 shadow-lg"
      >
        <p className="mb-2 flex items-center gap-1.5 text-[13px] font-semibold text-neutral-900">
          <VegMark isVegetarian={attributes.isVegetarian} />
          {name}
        </p>
        <dl className="space-y-1.5">
          {rows.map((row) => {
            const { icon: Icon } = row;
            const ValueIcon = row.getValueIcon?.(attributes);

            return (
              <div key={row.key} className="flex items-center gap-3">
                <dt className="flex flex-1 items-center gap-1.5 text-[12px] text-neutral-500 capitalize">
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  {row.label}
                </dt>
                <dd
                  className={`flex items-center gap-1.5 text-[12px] font-medium ${row.className}`}
                >
                  {ValueIcon && <ValueIcon className="h-3.5 w-3.5 shrink-0" />}
                  {row.render(attributes)}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </>
  );
};
