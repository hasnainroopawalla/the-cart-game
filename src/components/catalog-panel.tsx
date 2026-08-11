import * as React from "react";
import { Card, CollapseToggle, PanelHeader, formatPrice } from "./card";
import { AttributeSummary } from "./attribute-summary";
import { VegMark } from "./attribute-style";
import { ItemInfoButton } from "./item-info-popover";
import { QuantityStepper } from "./quantity-stepper";
import { Plus, Search, SearchX, ShoppingBasket, Tags } from "lucide-react";
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
  const [isPanelOpen, setIsPanelOpen] = React.useState(true);
  const [showAttributes, setShowAttributes] = React.useState(true);

  const visibleItems = React.useMemo(() => {
    const search = query.trim().toLowerCase();

    return Catalog.items.filter(
      (item) =>
        (category === null || item.attributes.category === category) &&
        (search === "" || item.name.toLowerCase().includes(search)),
    );
  }, [query, category]);

  return (
    <Card className="flex min-h-0 flex-col overflow-hidden">
      <PanelHeader
        icon={<ShoppingBasket className="h-5 w-5" />}
        title="Catalog"
        subtitle={
          isPanelOpen
            ? `${visibleItems.length} of ${Catalog.items.length} items`
            : `${Catalog.items.length} items`
        }
        right={
          <div className="flex items-center gap-2">
            {isPanelOpen && (
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
              isOpen={isPanelOpen}
              onToggle={() => setIsPanelOpen((open) => !open)}
              label="catalog"
            />
          </div>
        }
      />

      {isPanelOpen && (
        <>
          <div className="flex items-start gap-2 px-5 pt-4">
            <div className="flex flex-1 flex-wrap items-center gap-2">
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

            <button
              type="button"
              aria-pressed={showAttributes}
              onClick={() => setShowAttributes((shown) => !shown)}
              aria-label="Toggle item details"
              title={
                showAttributes
                  ? "Hide item details"
                  : "Show category, protein and colour on every card"
              }
              className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition ${
                showAttributes
                  ? "border-primary-200 bg-primary-50 text-primary-700"
                  : "border-neutral-200 bg-white text-neutral-500 hover:border-neutral-300 hover:text-neutral-900"
              }`}
            >
              <Tags className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-3 max-h-100 min-h-0 flex-1 overflow-y-auto px-5 pb-5 [scrollbar-gutter:stable] lg:max-h-none">
            {visibleItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 px-8 py-10 text-center">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-neutral-50 text-neutral-300">
                  <SearchX className="h-6 w-6" />
                </span>
                <p className="text-[14px] font-semibold text-neutral-700">
                  No items found
                </p>
                <p className="text-[13px] text-neutral-400">
                  Try another search term or pick a different category.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(8.5rem,1fr))] content-start gap-3 p-1">
                {visibleItems.map((item) => (
                  <CatalogCard
                    key={item.id}
                    item={item}
                    onQuantityChange={addItemToCart}
                    quantityInCart={getQuantityByItemId(item.id)}
                    showAttributes={showAttributes}
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
  showAttributes,
}: {
  item: CatalogItem;
  quantityInCart: number;
  onQuantityChange: (itemId: string, quantity: number) => void;
  showAttributes: boolean;
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
      className={`flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md ${
        showAttributes ? "pb-2.5" : "pb-2"
      } ${inCart ? "ring-primary-200 ring-2" : ""}`}
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
        <div className="flex items-center gap-1">
          <VegMark isVegetarian={item.attributes.isVegetarian} />
          <ItemInfoButton
            name={item.name}
            attributes={item.attributes}
            className="h-6 w-6"
          />
        </div>
      </div>

      <p
        className="line-clamp-2 max-h-8 px-2.5 pt-0.5 text-[12.5px] leading-4 font-semibold break-words text-neutral-800"
        title={item.name}
      >
        {item.name}
      </p>

      {showAttributes && (
        <AttributeSummary
          attributes={item.attributes}
          compact
          className="animate-row-in mt-auto flex px-2.5 pt-1.5"
        />
      )}
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
