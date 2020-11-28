import { useEffect, useState } from "react";
import { getRequest } from "../helpers/apiService";

export const useFetch = <T, >(url: string, options: any = null) => {
  const [response, setResponse] = useState<T | undefined>(undefined);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsFetchingData(true);
        const response = await getRequest(url);
        setResponse(response);
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
