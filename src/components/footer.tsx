const REPO_URL = "https://github.com/hasnainroopawalla/the-cart-game";

export const Footer = () => (
  <footer className="flex shrink-0 items-center justify-center gap-1.5 pt-3 text-[12px] text-neutral-400">
    <span>Hasnain Roopawalla</span>
    <span className="text-neutral-300">·</span>
    <span className="tabular-nums">v{__APP_VERSION__}</span>
    <span className="text-neutral-300">·</span>
    <a
      href={`${REPO_URL}/issues/new`}
      target="_blank"
      rel="noreferrer"
      className="underline-offset-2 transition hover:text-neutral-700 hover:underline"
    >
      Report a bug
    </a>
  </footer>
);
