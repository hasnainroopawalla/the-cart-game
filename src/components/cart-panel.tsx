import * as React from "react";
import { Card, IconButton, PanelHeader, formatPrice } from "./card";
import {
  Apple,
  Beef,
  Carrot,
  Cookie,
  CupSoda,
  Milk,
  ShoppingCart,
  Tag,
  Wheat,
  X,
} from "lucide-react";
import { ItemInfoButton } from "./item-info-popover";
import { QuantityStepper } from "./quantity-stepper";
import {
  CRITICAL_ATTRIBUTES,
  Catalog,
  RELEVANT_ATTRIBUTES,
  type CatalogItem,
  type ItemAttributes,
} from "../data";

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
          <div className="flex items-center gap-3">
            {cartItems.size > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="cursor-pointer rounded-lg px-2 py-1 text-[13px] font-medium text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
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
    </Card>
  );
};

const COLOR_DOT: Record<ItemAttributes["color"], string> = {
  green: "bg-emerald-500",
  red: "bg-red-500",
  yellow: "bg-amber-400",
  orange: "bg-orange-400",
  brown: "bg-amber-700",
  white: "bg-neutral-300",
};

const CATEGORY_ICON: Record<string, React.ElementType> = {
  Dairy: Milk,
  Vegetables: Carrot,
  Fruits: Apple,
  Grains: Wheat,
  Snacks: Cookie,
  Drinks: CupSoda,
};

const AttributeChip = ({
  icon: Icon,
  critical,
  title,
  children,
}: {
  icon?: React.ElementType;
  critical?: boolean;
  title: string;
  children: React.ReactNode;
}) => (
  <span
    title={title}
    className={`inline-flex shrink-0 items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] leading-none font-medium ${
      critical
        ? "bg-amber-50 text-amber-700"
        : "bg-neutral-100 text-neutral-600"
    }`}
  >
    {Icon && <Icon className="h-3 w-3" />}
    {children}
  </span>
);

const AttributeSummary = ({ attributes }: { attributes: ItemAttributes }) => (
  <div className="hidden items-center gap-1 sm:flex">
    {RELEVANT_ATTRIBUTES.has("category") && (
      <AttributeChip
        icon={CATEGORY_ICON[attributes.category] ?? Tag}
        title={`Category: ${attributes.category}`}
      >
        {attributes.category}
      </AttributeChip>
    )}
    {RELEVANT_ATTRIBUTES.has("protein") && (
      <AttributeChip
        icon={Beef}
        critical={CRITICAL_ATTRIBUTES.has("protein")}
        title={`Protein: ${attributes.protein}g`}
      >
        {attributes.protein}g
      </AttributeChip>
    )}
    {RELEVANT_ATTRIBUTES.has("color") && (
      <span
        title={`Colour: ${attributes.color}`}
        className={`h-2.5 w-2.5 shrink-0 rounded-full ring-1 ring-black/10 ${COLOR_DOT[attributes.color]}`}
      />
    )}
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
  <li className="flex items-center gap-3 border-b border-neutral-100 px-5 py-2 last:border-b-0">
    <span className="text-xl leading-none">{item.emoji}</span>
    <div className="min-w-0 flex-1 space-y-0 sm:space-y-1">
      <div className="flex items-baseline gap-1.5">
        <p className="text-[14px] font-semibold text-neutral-900 sm:truncate">
          {item.name}
        </p>
        {item.size && (
          <span className="hidden shrink-0 text-[12px] text-neutral-400 sm:inline">
            <span className="pr-1.5 text-neutral-300">·</span>
            {item.size}
          </span>
        )}
        <span className="self-center sm:hidden">
          <ItemInfoButton name={item.name} attributes={item.attributes} />
        </span>
      </div>
      {item.size && (
        <p className="truncate text-[12px] text-neutral-500 sm:hidden">
          {item.size}
        </p>
      )}
      <AttributeSummary attributes={item.attributes} />
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
