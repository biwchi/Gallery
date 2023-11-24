import { useState } from "react";

export function useLoading<T, A extends any[]>(
  action: (...args: A) => Promise<T>,
): [(...args: A) => Promise<T>, boolean] {
  const [isLoading, setIsLoading] = useState(false);

  const doAction = async (...args: A) => {
    setIsLoading(true);
    return action(...args).finally(() => setIsLoading(false));
  };

  return [doAction, isLoading];
}
