import * as React from "react";
import { Card, IconButton, PanelHeader, formatPrice } from "./card";
import { ShoppingCart, X } from "lucide-react";
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

const EmptyCart = () => (
  <div className="px-8 py-10 text-center">
    <p className="text-[14px] font-semibold text-neutral-700">
      Your cart is empty
    </p>
    <p className="mt-1 text-[13px] text-neutral-400">
      Add items from the catalog to start ticking off rules.
    </p>
  </div>
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
  <li className="animate-row-in flex items-center gap-3 border-b border-neutral-100 px-5 py-2.5 last:border-b-0">
    <span className="text-xl leading-none">{item.emoji}</span>

    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-3">
        <div className="flex min-w-0 flex-1 items-baseline gap-1.5">
          <VegMark
            isVegetarian={item.attributes.isVegetarian}
            className="h-3 w-3 self-center"
          />
          <p className="truncate text-[14px] font-semibold text-neutral-900">
            {item.name}
          </p>
          {item.size && (
            <span className="shrink-0 text-[12px] text-neutral-500">
              {item.size}
            </span>
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
      </div>

      <AttributeSummary attributes={item.attributes} className="mt-1 flex" />
    </div>
  </li>
);
