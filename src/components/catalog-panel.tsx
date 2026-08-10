import * as React from "react";
import { Card, CollapseToggle, PanelHeader, formatPrice } from "./card";
import { ItemInfoButton } from "./item-info-popover";
import { QuantityStepper } from "./quantity-stepper";
import { Plus, Search, ShoppingBasket } from "lucide-react";
import { Catalog, CatalogItem, Categories, Category } from "../data";

export const CatalogPanel = ({
  addItemToCart,
  getQuantityByItemId,
}: {
  addItemToCart: (itemId: string, quantity: number) => void;
  getQuantityByItemId: (itemId: string) => number;
}) => {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<Category | null>(null);
  const [isOpen, setIsOpen] = React.useState(true);

  const visibleItems = React.useMemo(() => {
    const search = query.trim().toLowerCase();

    return Catalog.items.filter(
      (item) =>
        (category === null || item.attributes.category === category) &&
        (search === "" || item.name.toLowerCase().includes(search)),
    );
  }, [query, category]);

  return (
    <Card className="flex shrink-0 flex-col overflow-hidden">
      <PanelHeader
        icon={<ShoppingBasket className="h-5 w-5" />}
        title="Item Catalog"
        subtitle={
          isOpen
            ? `${visibleItems.length} of ${Catalog.items.length} items`
            : `${Catalog.items.length} items available`
        }
        right={
          <div className="flex items-center gap-2">
            {isOpen && (
              <div className="relative w-64">
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for an item..."
                  className="focus:border-primary-400 w-full rounded-lg border border-neutral-200 py-1.5 pr-9 pl-3 text-[13.5px] text-neutral-800 outline-none placeholder:text-neutral-400"
                />
                <Search className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              </div>
            )}
            <CollapseToggle
              isOpen={isOpen}
              onToggle={() => setIsOpen((open) => !open)}
              label="catalog"
            />
          </div>
        }
      />

      {isOpen && (
        <>
          <div className="flex flex-wrap items-center gap-2 px-5 pt-4">
            <CategoryChip
              label="All"
              active={category === null}
              onClick={() => setCategory(null)}
            />
            {Categories.map((name) => (
              <CategoryChip
                key={name}
                label={name}
                active={name === category}
                onClick={() => setCategory(name)}
              />
            ))}
          </div>

          <div className="mt-3 px-5 pb-5">
            {visibleItems.length === 0 ? (
              <p className="py-6 text-center text-[13px] text-neutral-400">
                Nothing matches that. Try another search or category.
              </p>
            ) : (
              <div className="grid max-h-80 grid-cols-[repeat(auto-fill,minmax(8.5rem,1fr))] content-start gap-3 overflow-y-auto rounded-xl bg-neutral-100 p-3">
                {visibleItems.map((item) => (
                  <CatalogCard
                    key={item.id}
                    item={item}
                    onQuantityChange={addItemToCart}
                    quantityInCart={getQuantityByItemId(item.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}
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

  const inCart = quantityInCart > 0;

  return (
    <article
      className={`flex flex-col overflow-hidden rounded-xl bg-white shadow-xs transition hover:shadow-md ${
        inCart ? "ring-primary-200 ring-2" : ""
      }`}
    >
      <div
        className={`relative grid h-20 place-items-center text-3xl leading-none transition-colors ${
          inCart ? "bg-primary-50" : "bg-neutral-50"
        }`}
      >
        {item.emoji}

        <span className="absolute -bottom-3.5 left-2 inline-flex h-7 items-center rounded-lg border border-neutral-200 bg-white px-2 text-[11.5px] font-medium text-neutral-600 shadow-xs">
          {item.size}
        </span>

        <div className="absolute right-2 -bottom-3.5">
          {!inCart ? (
            <button
              type="button"
              aria-label={`Add ${item.name}`}
              className="border-primary-200 text-primary-700 hover:bg-primary-50 inline-flex h-7 w-7 items-center justify-center rounded-lg border bg-white shadow-sm transition"
              onClick={onIncrement}
            >
              <Plus className="h-3.5 w-3.5" />
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

const CategoryChip = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition ${
      active
        ? "border-primary-200 bg-primary-50 text-primary-700"
        : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-neutral-900"
    }`}
  >
    {label}
  </button>
);
