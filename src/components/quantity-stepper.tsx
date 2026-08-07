import { IconButton } from "./card";
import { MinusIcon, PlusIcon } from "./icons";

export const QuantityStepper = ({
  quantity,
  onIncrement,
  onDecrement,
}: {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}) => (
  <div className="flex shrink-0 items-center rounded-lg border border-neutral-200">
    <IconButton
      label="Decrease quantity"
      className="h-6 w-6 border-0"
      onClick={onDecrement}
    >
      <MinusIcon className="h-3 w-3" />
    </IconButton>
    <span className="w-5 text-center text-[13px] font-medium tabular-nums">
      {quantity}
    </span>
    <IconButton
      label="Increase quantity"
      className="h-6 w-6 border-0"
      onClick={onIncrement}
    >
      <PlusIcon className="h-3 w-3" />
    </IconButton>
  </div>
);
