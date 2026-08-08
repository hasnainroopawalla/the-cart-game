import { RotateCcw } from "lucide-react";
import { GithubIcon } from "./icons";

const REPO_URL = "https://github.com/hasnainroopawalla/the-cart-game";

const ICON_LINK =
  "inline-flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-700 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition hover:border-neutral-300 hover:text-neutral-900";

const HeaderButton = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <button
    type="button"
    className="cursor-pointer inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-[14px] font-medium text-neutral-700 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition hover:border-neutral-300 hover:text-neutral-900"
  >
    <span className="text-neutral-700">{icon}</span>
    {label}
  </button>
);

export const Header = () => (
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
      <HeaderButton icon={<RotateCcw className="h-4 w-4" />} label="New Game" />
      <a
        href={REPO_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="View source on GitHub"
        title="View source on GitHub"
        className={ICON_LINK}
      >
        <GithubIcon className="h-4.5 w-4.5" />
      </a>
    </div>
  </header>
);
