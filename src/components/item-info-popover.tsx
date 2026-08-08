import * as React from "react";
import {
  CRITICAL_ATTRIBUTES,
  RELEVANT_ATTRIBUTES,
  type ItemAttributes,
} from "../data";
import { Info } from "lucide-react";

const PANEL_WIDTH = 224;
const ESTIMATED_PANEL_HEIGHT = 180;
const VIEWPORT_MARGIN = 8;

const COLOR_SWATCH: Record<ItemAttributes["color"], string> = {
  green: "bg-emerald-500",
  red: "bg-red-500",
  yellow: "bg-amber-400",
  orange: "bg-orange-400",
  brown: "bg-amber-700",
  white: "bg-neutral-200",
};

const ATTRIBUTE_ROWS: {
  key: keyof ItemAttributes;
  label: string;
  render: (attributes: ItemAttributes) => React.ReactNode;
}[] = [
  { key: "category", label: "Category", render: (a) => a.category },
  { key: "protein", label: "Protein", render: (a) => `${a.protein}g` },
  {
    key: "color",
    label: "Colour",
    render: (a) => (
      <span className="inline-flex items-center gap-1.5 capitalize">
        <span
          className={`h-2.5 w-2.5 rounded-full ring-1 ring-black/10 ${COLOR_SWATCH[a.color]}`}
        />
        {a.color}
      </span>
    ),
  },
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

  const rows = ATTRIBUTE_ROWS.filter((row) => RELEVANT_ATTRIBUTES.has(row.key));

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
          open ? "text-neutral-700" : "text-neutral-300 hover:text-neutral-600"
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
        <p className="mb-2 text-[13px] font-semibold text-neutral-900">
          {name}
        </p>
        <dl className="space-y-1.5">
          {rows.map((row) => (
            <div key={row.key} className="flex items-center gap-3">
              <dt className="flex-1 text-[12px] text-neutral-500">
                {row.label}
              </dt>
              <dd
                className={`text-[12px] font-medium ${
                  CRITICAL_ATTRIBUTES.has(row.key)
                    ? "text-amber-700"
                    : "text-neutral-800"
                }`}
              >
                {row.render(attributes)}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
};
