import { GithubIcon, HelpIcon } from "./icons";

const ICON_BUTTON =
  "inline-flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-500 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition hover:border-neutral-300 hover:text-neutral-900";

const HeaderButton = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <button
    type="button"
    className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-[14px] font-medium text-neutral-700 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition hover:border-neutral-300 hover:text-neutral-900"
  >
    <span className="text-neutral-500">{icon}</span>
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
        <p className="text-[13px] text-neutral-500">
          Satisfy all rules with your cart.
        </p>
      </div>
    </div>

    <div className="flex items-center gap-2.5">
      <HeaderButton icon={<HelpIcon className="h-4 w-4" />} label="Help" />
      {/* <HeaderButton
        icon={<RestartIcon className="h-4 w-4" />}
        label="Restart"
      /> */}
      <a
        href="https://github.com/hasnainroopawalla/cart-game"
        target="_blank"
        rel="noreferrer"
        aria-label="View source on GitHub"
        title="View source on GitHub"
        className={ICON_BUTTON}
      >
        <GithubIcon className="h-4.5 w-4.5" />
      </a>
    </div>
  </header>
);
