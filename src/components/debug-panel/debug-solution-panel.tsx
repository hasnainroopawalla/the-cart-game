import * as React from "react";
import { X } from "lucide-react";
import { formatPrice } from "../card";
import { useDebugSolution } from "./use-debug-solution";
import { CartUtils, type CartItems } from "../../data";

export const DebugSolutionPanel = ({
  solutionCart,
}: {
  solutionCart: CartItems;
}) => {
  const { isVisible, hide } = useDebugSolution();

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") hide();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [hide]);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Solution cart"
      className="fixed bottom-6 left-6 z-50 flex max-h-[70vh] w-72 flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl"
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <h2 className="text-[14px] font-bold text-neutral-900">
          Solution cart
        </h2>

        <button
          type="button"
          onClick={hide}
          aria-label="Close solution"
          className="-mr-1 rounded-lg p-1.5 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-900"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <ul className="min-h-0 flex-1 overflow-y-auto border-y border-neutral-100 px-4 py-2">
        {Array.from(solutionCart, ([itemId, quantity]) => {
          const item = CartUtils.getCatalogItem(itemId);

          return (
            <li
              key={itemId}
              className="flex items-center gap-2.5 py-1 text-[13.5px]"
            >
              <span className="text-[16px]">{item.emoji}</span>
              <span className="min-w-0 flex-1 truncate text-neutral-800">
                {item.name}
              </span>
              <span className="text-[12.5px] text-neutral-400 tabular-nums">
                x{quantity}
              </span>
              <span className="w-12 text-right font-medium text-neutral-900 tabular-nums">
                {formatPrice(item.price * quantity)}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="px-4 py-3 text-[12.5px] text-neutral-500">
        {CartUtils.getItemCount(solutionCart)} items ·{" "}
        <span className="font-semibold text-neutral-900">
          {formatPrice(CartUtils.getTotal(solutionCart))}
        </span>
      </div>
    </aside>
  );
};
