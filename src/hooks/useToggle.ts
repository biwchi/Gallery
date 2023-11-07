import { useCallback, useState } from "react";

export function useToggle(
  defaultValue: boolean,
): [boolean, (val?: boolean) => void] {
  const [value, setValue] = useState(defaultValue);

  const toggle = useCallback((newValue?: boolean) => {
    if (newValue !== undefined) return setValue((v) => (v = newValue));

    setValue((v) => (v = !v));
  }, []);

  return [value, toggle];
}
