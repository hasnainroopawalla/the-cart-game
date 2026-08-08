import * as React from "react";
import { Card, IconButton, PanelHeader, formatPrice } from "./card";
import { ShoppingCart, Trash2, X } from "lucide-react";
import { ItemInfoButton } from "./item-info-popover";
import { QuantityStepper } from "./quantity-stepper";
import { Catalog, type CatalogItem } from "../data";

type CartItem = CatalogItem & {
  quantity: number;
};

export type CartItemsMap = Map<string /* itemId */, number /* quantity */>;

export const CartPanel = ({
  cartItems,
  addItemToCart,
  removeItemFromCart,
  clearCart,
}: {
  cartItems: CartItemsMap;
  addItemToCart: (itemId: string, quantity: number) => void;
  removeItemFromCart: (itemId: string) => void;
  clearCart: () => void;
}) => {
  const { itemCount, totalAmount } = React.useMemo(
    () =>
      Array.from(cartItems.entries()).reduce(
        (acc, [itemId, quantity]) => {
          const itemUnitPrice = Catalog.byId.get(itemId)?.price;

          if (!itemUnitPrice) {
            throw new Error(`Unknown Item. [id=${itemId}]`);
          }

          return {
            itemCount: acc.itemCount + quantity,
            totalAmount: acc.totalAmount + itemUnitPrice * quantity,
          };
        },
        { itemCount: 0, totalAmount: 0 },
      ),
    [cartItems],
  );

  return (
    <Card className="flex min-h-0 flex-col overflow-hidden">
      <PanelHeader
        icon={<ShoppingCart className="h-5 w-5" />}
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
          const item = Catalog.byId.get(itemId);
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
          onClick={clearCart}
        >
          <Trash2 className="h-3.5 w-3.5" />
          Clear Cart
        </button>
      </div>
    </Card>
  );
};

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
