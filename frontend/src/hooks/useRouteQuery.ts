import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function useRouteQuery(
  queryName: string,
  defaultValue?: string,
): [string | undefined, (value: string) => void] {
  const navigate = useNavigate();

  const [params, setParams] = useSearchParams();
  const [query, setThisQuery] = useState(params.get(queryName) || defaultValue)

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
    setThisQuery(value)
  };

  useEffect(() => {
    const queryParam = params.get(queryName);
    if (!queryParam) return;
    setQuery(queryParam);
    console.log(query)
  }, []);
  
  return [query, setQuery];
}
