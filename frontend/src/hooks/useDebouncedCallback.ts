import { useEffect, useRef } from "react";

export function useDebouncedCallback<A extends any[]>(
  fn: (...args: A) => void,
  delay: number,
) {
  const argsRef = useRef<A>();
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => clearTimeout(timeout.current), [])

  return function (...args: A) {
    argsRef.current = args;

    clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      if (argsRef.current) fn(...argsRef.current);
    }, delay);
  };
}
