import { useEffect, useState } from "react";

export function useDebounce<T>(val: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(val);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(val), delay);

    return () => clearTimeout(timeout);
  }, [val, delay]);

  return debouncedValue
}

