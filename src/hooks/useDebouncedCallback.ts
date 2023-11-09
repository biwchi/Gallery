import { useEffect, useRef } from "react";

export function useDebouncedCallback<A extends any[]>(
  fn: (...args: A) => void,
  delay: number,
) {
  const argsRef = useRef<A>();
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const clear = () =>
    timeout.current !== undefined ? clearTimeout(timeout.current) : undefined;

  useEffect(() => clear(), []);

  return function debouncedCallback(...args: A) {
    argsRef.current = args;

    clear();

    timeout.current = setTimeout(() => {
      if (argsRef.current) fn(...argsRef.current);
    }, delay);
  };
}
