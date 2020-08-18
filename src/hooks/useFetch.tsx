import { useEffect, useState } from "react";

export const useFetch = <T, >(url: string, options: any = null) => {
  const [response, setResponse] = useState<T | undefined>(undefined);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsFetchingData(true);
        const res = await fetch(url, options);
        if (res.ok) {
          const json = await res.json();
          setResponse(json);
        }
        else {
          setError(new Error(res.statusText));
        }
      } catch (e) {
        setError(e);
      } finally {
        setIsFetchingData(false);
      }
    };
    fetchData();
  }, [url, options]);
  return {
    response,
    isFetchingData,
    error
  };
};
