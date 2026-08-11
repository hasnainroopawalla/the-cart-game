import * as React from "react";

export const useElapsedTime = () => {
  const startedAt = React.useRef(Date.now());

  const restart = React.useCallback(() => {
    startedAt.current = Date.now();
  }, []);

  const getElapsedSeconds = React.useCallback(
    () => Math.round((Date.now() - startedAt.current) / 1000),
    [],
  );

  return { restart, getElapsedSeconds };
};

export const formatDuration = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
};
