import * as React from "react";
import { CATALOG_ITEMS, type CartItem } from "../data";
import { Card, IconButton, PanelHeader, formatPrice } from "./card";
import { CartIcon, CloseIcon, TrashIcon } from "./icons";
import { ItemInfoButton } from "./item-info-popover";
import { QuantityStepper } from "./quantity-stepper";

export type CartItemsMap = Map<string /* itemId */, number /* quantity */>;

const CartRow = ({
  item,
  onQuantityChange,
  onRemove,
}: {
  item: CartItem;
  onQuantityChange: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
}) => (
  <li className="flex items-center gap-3 border-b border-neutral-100 px-5 py-2 last:border-b-0">
    <span className="text-xl leading-none">{item.emoji}</span>
    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-1">
        <p className="truncate text-[14px] font-semibold text-neutral-900">
          {item.name}
        </p>
        <ItemInfoButton name={item.name} attributes={item.attributes} />
      </div>
      {item.size && (
        <p className="truncate text-[12px] text-neutral-500">{item.size}</p>
      )}
    </div>
    <QuantityStepper
      quantity={item.quantity}
      onIncrement={() => onQuantityChange(item.id, 1)}
      onDecrement={() => onQuantityChange(item.id, -1)}
    />
    <span className="w-14 text-right text-[14px] font-semibold text-neutral-900 tabular-nums">
      {formatPrice(item.price)}
    </span>
    <IconButton
      label={`Remove ${item.name}`}
      className="h-6 w-6 border-0 text-neutral-300 hover:text-neutral-700"
      onClick={() => onRemove(item.id)}
    >
      <CloseIcon className="h-3.5 w-3.5" />
    </IconButton>
  </li>
);

export const CartPanel = ({
  cartItems,
  addItemToCart,
  removeItemFromCart,
}: {
  cartItems: CartItemsMap;
  addItemToCart: (itemId: string, quantity: number) => void;
  removeItemFromCart: (itemId: string) => void;
}) => {
  // const itemCount = Array.from(cartItems.values()).reduce((sum, quantity) => sum + quantity, 0);
  // const total = Array.from(cartItems.entries()).reduce(
  //   (sum, [itemId, quantity]) => {
  //     const item = CATALOG_ITEMS.find((item) => item.id === itemId);
  //     return item ? sum + item.price * quantity : sum;
  //   },
  //   0,
  // );

  const { itemCount, totalAmount } = React.useMemo(
    () =>
      Array.from(cartItems.values()).reduce(
        (acc, quantity) => ({
          itemCount: acc.itemCount + quantity,
          totalAmount: acc.totalAmount + 100, // TODO: add catalog lookup for price
        }),
        { itemCount: 0, totalAmount: 0 },
      ),
    [cartItems],
  );

  return (
    <Card className="flex min-h-0 flex-col overflow-hidden">
      <PanelHeader
        icon={<CartIcon className="h-5 w-5" />}
        title="Your Cart"
        subtitle={`${itemCount} ${itemCount === 1 ? "item" : "items"}`}
        right={
          <span className="text-[22px] font-bold text-neutral-900 tabular-nums">
            {formatPrice(totalAmount)}
          </span>
        }
      />

      <ul className="min-h-0 flex-auto overflow-y-auto">
        {Array.from(cartItems.entries()).map(([itemId, quantity]) => {
          // TODO: add a proper lookup
          const item = CATALOG_ITEMS.find((item) => item.id === itemId);
          return item ? (
            <CartRow
              key={item.id}
              item={{ ...item, quantity }}
              onQuantityChange={addItemToCart}
              onRemove={removeItemFromCart}
            />
          ) : null;
        })}
      </ul>

      <div className="shrink-0 px-5 pt-3 pb-4">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50/60 py-2 text-[13.5px] font-medium text-neutral-600 transition hover:border-neutral-300 hover:text-neutral-900"
        >
          <TrashIcon className="h-3.5 w-3.5" />
          Clear Cart
        </button>
      </div>
    </Card>
  );
};
