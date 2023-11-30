import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function useRouteQuery(
  queryName: string,
): [string | null, (value: string) => void] {
  const navigate = useNavigate();

  const [params, setParams] = useSearchParams();
  const [query, setThisQuery] = useState(params.get(queryName));

  const setQuery = (value: string | undefined) => {
    if (params.has(queryName, value)) return;

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
    const queryParam = params.get(queryName);
    if (!queryParam) {
      setThisQuery(null);
      return;
    }
    setQuery(queryParam);
    setThisQuery(queryParam);
  }, [params.get(queryName)]);

  return [query, setQuery];
}
