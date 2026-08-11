import * as React from "react";
import { Card, IconButton, PanelHeader, formatPrice } from "./card";
import { ShoppingCart, X } from "lucide-react";
import { ItemInfoButton } from "./item-info-popover";
import { QuantityStepper } from "./quantity-stepper";
import { AttributeSummary } from "./attribute-summary";
import { VegMark } from "./attribute-style";
import { CartUtils, type CartItems, type CatalogItem } from "../data";

type CartItem = CatalogItem & {
  quantity: number;
};

export const CartPanel = ({
  cartItems,
  addItemToCart,
  removeItemFromCart,
  clearCart,
}: {
  cartItems: CartItems;
  addItemToCart: (itemId: string, quantity: number) => void;
  removeItemFromCart: (itemId: string) => void;
  clearCart: () => void;
}) => {
  const [itemCount, totalAmount] = React.useMemo(
    () => [CartUtils.getItemCount(cartItems), CartUtils.getTotal(cartItems)],
    [cartItems],
  );

  return (
    <Card className="@container flex max-h-full min-h-0 flex-col self-start overflow-hidden">
      <PanelHeader
        icon={<ShoppingCart className="h-5 w-5" />}
        title="Your Cart"
        subtitle={`${itemCount} ${itemCount === 1 ? "item" : "items"}`}
        right={
          <div className="flex items-center gap-3">
            {cartItems.size > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="rounded-lg px-2 py-1 text-[13px] font-medium text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
              >
                Clear
              </button>
            )}
            <span className="text-[22px] font-bold text-neutral-900 tabular-nums">
              {formatPrice(totalAmount)}
            </span>
          </div>
        }
      />

      {cartItems.size === 0 ? (
        <EmptyCart />
      ) : (
        <ul className="min-h-0 flex-auto overflow-y-auto">
          {Array.from(cartItems.entries()).map(([itemId, quantity]) => {
            const item = CartUtils.getCatalogItem(itemId);
            return (
              <CartRow
                key={item.id}
                item={{ ...item, quantity }}
                onQuantityChange={addItemToCart}
                onRemove={removeItemFromCart}
              />
            );
          })}
        </ul>
      )}
    </Card>
  );
};

const GHOST_ROW_COUNT = 3;

const GhostRow = () => (
  <li className="flex items-center gap-3 border-b border-neutral-100 px-5 py-3">
    <span className="h-7 w-7 shrink-0 rounded-full border border-dashed border-neutral-300" />
    <span className="h-2.5 flex-1 rounded-full bg-neutral-200" />
    <span className="h-7 w-16 shrink-0 rounded-lg border border-dashed border-neutral-300" />
    <span className="h-2.5 w-10 shrink-0 rounded-full bg-neutral-200" />
  </li>
);

const EmptyCart = () => (
  <ul aria-hidden="true" className="min-h-0 flex-auto overflow-hidden">
    {Array.from({ length: GHOST_ROW_COUNT }, (_, index) => (
      <GhostRow key={index} />
    ))}
  </ul>
);

const CartRow = ({
  item,
  onQuantityChange,
  onRemove,
}: {
  item: CartItem;
  onQuantityChange: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
}) => (
  <li className="animate-row-in flex items-center gap-3 border-b border-neutral-100 px-5 py-2 last:border-b-0">
    <span className="text-xl leading-none">{item.emoji}</span>
    <div className="min-w-0 flex-1 space-y-0 @sm:space-y-1">
      <div className="flex flex-wrap items-baseline gap-x-1.5">
        <VegMark
          isVegetarian={item.attributes.isVegetarian}
          className="h-3 w-3 self-center"
        />
        <p className="text-[14px] font-semibold text-neutral-900 @sm:truncate">
          {item.name}
        </p>
        {item.size && (
          <span className="basis-full text-[12px] text-neutral-600 @sm:basis-auto @sm:shrink-0">
            <span className="hidden pr-1.5 text-neutral-300 @sm:inline">·</span>
            {item.size}
          </span>
        )}
        <span className="self-center @sm:hidden">
          <ItemInfoButton name={item.name} attributes={item.attributes} />
        </span>
      </div>
      <AttributeSummary
        attributes={item.attributes}
        className="hidden @sm:flex"
      />
    </div>
    <QuantityStepper
      quantity={item.quantity}
      onIncrement={() => onQuantityChange(item.id, 1)}
      onDecrement={() => onQuantityChange(item.id, -1)}
    />
    <span className="w-14 text-right text-[14px] font-semibold text-neutral-900 tabular-nums">
      {formatPrice(item.price * item.quantity)}
    </span>
    <IconButton
      label={`Remove ${item.name}`}
      className="h-6 w-6 border-0 text-neutral-300 hover:text-neutral-700"
      onClick={() => onRemove(item.id)}
    >
      <X className="h-3.5 w-3.5" />
    </IconButton>
  </li>
);
