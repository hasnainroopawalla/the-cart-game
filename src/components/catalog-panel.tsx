import * as React from "react";
import { CATALOG_ITEMS, CATEGORIES, type CatalogItem } from "../data";
import { Card, PanelHeader, formatPrice } from "./card";
import { ItemInfoButton } from "./item-info-popover";
import { QuantityStepper } from "./quantity-stepper";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  LockIcon,
  PlusIcon,
  SearchIcon,
} from "./icons";

const CategoryChip = ({
  label,
  active,
  children,
}: {
  label: string;
  active?: boolean;
  children?: React.ReactNode;
}) => (
  <button
    type="button"
    className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition ${
      active
        ? "border-sky-200 bg-sky-50 text-sky-700"
        : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-neutral-900"
    }`}
  >
    {label}
    {children}
  </button>
);

export const CatalogPanel = ({
  addItemToCart,
  getQuantityByItemId,
}: {
  addItemToCart: (itemId: string, quantity: number) => void;
  getQuantityByItemId: (itemId: string) => number;
}) => {
  return (
    <Card className="shrink-0">
      <PanelHeader
        icon={<LockIcon className="h-5 w-5" />}
        title="Item Catalog"
        subtitle="Browse the shelves and stock your cart."
        right={
          <div className="relative w-64">
            <input
              type="search"
              placeholder="Search for an item..."
              className="w-full rounded-lg border border-neutral-200 py-1.5 pr-9 pl-3 text-[13.5px] text-neutral-800 outline-none placeholder:text-neutral-400 focus:border-sky-400"
            />
            <SearchIcon className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          </div>
        }
      />

      <div className="flex flex-wrap items-center gap-2 px-5 pt-4">
        {CATEGORIES.map((category) => (
          <CategoryChip
            key={category}
            label={category}
            active={category === "All"}
          />
        ))}
        <CategoryChip label="More">
          <ChevronDownIcon className="h-3.5 w-3.5" />
        </CategoryChip>
      </div>

      <div className="relative mt-3 px-5 pb-5">
        <div className="flex gap-3 overflow-x-auto pb-1">
          {CATALOG_ITEMS.map((item) => (
            <CatalogCard
              key={item.id}
              item={item}
              onQuantityChange={addItemToCart}
              quantityInCart={getQuantityByItemId(item.id)}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Show more items"
          className="absolute top-1/2 right-5 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 shadow-sm transition hover:text-neutral-900"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>
    </Card>
  );
};

const CatalogCard = ({
  item,
  quantityInCart,
  onQuantityChange,
}: {
  item: CatalogItem;
  quantityInCart: number;
  onQuantityChange: (itemId: string, quantity: number) => void;
}) => {
  const onIncrement = React.useCallback(() => {
    onQuantityChange(item.id, 1);
  }, [item.id, onQuantityChange]);

  const onDecrement = React.useCallback(() => {
    onQuantityChange(item.id, -1);
  }, [item.id, onQuantityChange]);

  return (
    <article className="flex w-36 shrink-0 flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white">
      <div className="relative grid h-20 place-items-center bg-neutral-50 text-3xl leading-none">
        {item.emoji}

        {/* Both chips overlap the tile edge so they cost no extra row. */}
        <span className="absolute -bottom-3.5 left-2 inline-flex h-7 items-center rounded-lg border border-neutral-200 bg-white px-2 text-[11.5px] font-medium text-neutral-600 shadow-xs">
          {item.size}
        </span>

        <div className="absolute right-2 -bottom-3.5">
          {quantityInCart <= 0 ? (
            <button
              type="button"
              aria-label={`Add ${item.name}`}
              className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-sky-700 text-white shadow-sm transition hover:bg-sky-800"
              onClick={onIncrement}
            >
              <PlusIcon className="h-3.5 w-3.5" />
            </button>
          ) : (
            <QuantityStepper
              quantity={quantityInCart}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
              tone="primary"
              className="h-7 shadow-sm"
            />
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-1 px-2.5 pt-5">
        <span className="text-[14px] font-bold text-neutral-900 tabular-nums">
          {formatPrice(item.price)}
        </span>
        <ItemInfoButton
          name={item.name}
          attributes={item.attributes}
          className="h-6 w-6"
        />
      </div>

      <p
        className="line-clamp-2 px-2.5 pt-0.5 pb-2.5 text-[12.5px] leading-4 font-semibold text-neutral-800"
        title={item.name}
      >
        {item.name}
      </p>
    </article>
  );
};
