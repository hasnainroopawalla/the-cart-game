import { PartyPopper, RotateCcw } from "lucide-react";
import { formatPrice } from "./card";

export const GameCompleteOverlay = ({
  itemCount,
  totalSpend,
  moveCount,
  onPlayAgain,
  //   onDismiss,
}: {
  itemCount: number;
  totalSpend: number;
  moveCount: number;
  onPlayAgain: () => void;
  onDismiss: () => void;
}) => (
  <div
    role="dialog"
    aria-modal="true"
    aria-label="Shopping list complete"
    className="fixed inset-0 z-50 grid place-items-center bg-neutral-900/30 p-6 backdrop-blur-[2px]"
  >
    <div className="animate-rule-in w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
      <span className="bg-satisfied-50 text-satisfied-600 mx-auto grid h-14 w-14 place-items-center rounded-full">
        <PartyPopper className="h-7 w-7" />
      </span>

      <h2 className="mt-4 text-[20px] font-bold text-neutral-900">
        Shopping done!
      </h2>
      <p className="mt-1 text-[14px] text-neutral-500">
        Every rule on your shopping list is ticked.
      </p>

      <dl className="mt-5 grid grid-cols-3 gap-2 rounded-xl bg-neutral-50 p-3">
        <Stat label="Moves" value={String(moveCount)} />
        <Stat label="Items" value={String(itemCount)} />
        <Stat label="Spent" value={formatPrice(totalSpend)} />
      </dl>

      <div className="mt-5 flex flex-col gap-2">
        <button
          type="button"
          onClick={onPlayAgain}
          className="bg-primary-700 hover:bg-primary-800 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[14px] font-semibold text-white transition"
        >
          <RotateCcw className="h-4 w-4" />
          Play again
        </button>
        {/* <button
          type="button"
          onClick={onDismiss}
          className="rounded-xl px-4 py-2 text-[13px] font-medium text-neutral-500 transition hover:text-neutral-900"
        >
          Review my cart
        </button> */}
      </div>
    </div>
  </div>
);

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div>
    <dt className="text-[11.5px] tracking-wide text-neutral-400 uppercase">
      {label}
    </dt>
    <dd className="text-[15px] font-bold text-neutral-900 tabular-nums">
      {value}
    </dd>
  </div>
);
