import { useRef, useCallback } from "react";

export const useDebounce = (mainFunction, delay = 500) => {
  const timer = useRef(null);

  const debouncedFunction = useCallback(
    (...args) => {
      // Clear the previous timer
      if (timer.current) clearTimeout(timer.current);

      // Set a new timer
      timer.current = setTimeout(() => {
        mainFunction(...args);
      }, delay);
    },
    [mainFunction, delay]
  );

  return debouncedFunction;
};
