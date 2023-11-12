import { RefObject, useEffect } from "react";

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  callback: (event: MouseEvent) => void,
) {
  useEffect(() => {
    function clickOutside(event: MouseEvent) {
      const el = ref.current;
      if (!el || el.contains(event.target as Node)) return;

      callback(event);
    }

    document.addEventListener("mousedown", clickOutside);

    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);
}
