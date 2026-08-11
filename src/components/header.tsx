import { RotateCcw } from "lucide-react";

const HeaderButton = ({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-[14px] font-medium text-neutral-700 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition hover:border-neutral-300 hover:text-neutral-900"
  >
    <span className="text-neutral-700">{icon}</span>
    {label}
  </button>
);

export const Header = ({ startNewGame }: { startNewGame: () => void }) => (
  <header className="flex flex-wrap items-center justify-between gap-4">
    <div className="flex items-center gap-3">
      <img
        src={`${import.meta.env.BASE_URL}icon.svg`}
        alt=""
        className="h-10 w-10"
      />
      <div>
        <h1 className="text-[22px] leading-tight font-bold tracking-tight text-neutral-900">
          The Cart Game
        </h1>
      </div>
    </div>

    <div className="flex items-center gap-2.5">
      <HeaderButton
        icon={<RotateCcw className="h-4 w-4" />}
        label="New Game"
        onClick={startNewGame}
      />
    </div>
  </header>
);
