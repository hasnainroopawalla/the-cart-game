import { GithubIcon } from "./icons";

const AUTHOR_URL = "https://github.com/hasnainroopawalla";
const REPO_URL = `${AUTHOR_URL}/the-cart-game`;

const linkClass =
  "underline-offset-2 transition hover:text-neutral-700 hover:underline";

export const Footer = () => (
  <footer className="flex shrink-0 items-center justify-center gap-1.5 pt-3 text-[12px] text-neutral-400">
    <a
      href={AUTHOR_URL}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-1.5 ${linkClass}`}
    >
      <GithubIcon className="h-3.5 w-3.5" />
      Hasnain Roopawalla
    </a>
    <span className="text-neutral-300">·</span>
    <a
      href={`${REPO_URL}`}
      target="_blank"
      rel="noreferrer"
      className={`tabular-nums ${linkClass}`}
    >
      v{__APP_VERSION__}
    </a>
    <span className="text-neutral-300">·</span>
    <a
      href={`${REPO_URL}/issues/new`}
      target="_blank"
      rel="noreferrer"
      className={linkClass}
    >
      Feedback
    </a>
  </footer>
);
