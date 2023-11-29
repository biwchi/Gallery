import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function useRouteQuery(
  queryName: string,
  defaultValue?: string,
): [string | undefined, (value: string) => void] {
  const navigate = useNavigate();

  const [params, setParams] = useSearchParams();

  const setParam = (value: string | undefined) => {
    setParams((prevParams) => {
      if (!value) {
        prevParams.delete(queryName);
      } else {
        prevParams.set(queryName, value);
      }

      navigate({ search: `?${prevParams.toString()}` });
      return prevParams;
    });
  };

  useEffect(() => {
    const query = params.get(queryName) || defaultValue;
    const alreadyQueried = params.get(queryName);

    if (!query || defaultValue == alreadyQueried) return;
    setParam(query);
  }, []);

  return [params.get(queryName) || undefined, setParam];
}
