import { MinusIcon, PlusIcon } from "./icons";

const TONES = {
  neutral: {
    wrapper: "border border-neutral-200 bg-white",
    button: "text-neutral-500 hover:text-neutral-900",
    count: "text-neutral-900",
  },
  primary: {
    wrapper: "bg-sky-700",
    button: "text-white/75 hover:text-white",
    count: "text-white",
  },
} as const;

export const QuantityStepper = ({
  quantity,
  onIncrement,
  onDecrement,
  tone = "neutral",
  className = "",
}: {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  tone?: keyof typeof TONES;
  className?: string;
}) => {
  const styles = TONES[tone];

  return (
    <div
      className={`flex shrink-0 items-center rounded-lg ${styles.wrapper} ${className}`}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={onDecrement}
        className={`inline-flex h-6 w-6 items-center justify-center transition ${styles.button}`}
      >
        <MinusIcon className="h-3 w-3" />
      </button>
      <span
        className={`w-5 text-center text-[13px] font-medium tabular-nums ${styles.count}`}
      >
        {quantity}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={onIncrement}
        className={`inline-flex h-6 w-6 items-center justify-center transition ${styles.button}`}
      >
        <PlusIcon className="h-3 w-3" />
      </button>
    </div>
  );
};
