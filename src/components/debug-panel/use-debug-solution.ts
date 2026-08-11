import * as React from "react";

const DEBUG_HASH = "#solve";

/** Opened by loading the page with the debug hash. */
export const useDebugSolution = () => {
  const [isVisible, setIsVisible] = React.useState(
    () => window.location.hash === DEBUG_HASH,
  );

  React.useEffect(() => {
    const sync = () => setIsVisible(window.location.hash === DEBUG_HASH);

    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const hide = React.useCallback(() => {
    const { pathname, search } = window.location;
    window.history.replaceState(null, "", `${pathname}${search}`);
    setIsVisible(false);
  }, []);

  return { isVisible, hide };
};
