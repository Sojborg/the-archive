import { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppProvider";
import { getRequest } from "../helpers/apiService";

export const useFetch = <T, >(url: string, options: any = null) => {
  const [response, setResponse] = useState<T | undefined>(undefined);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const appContext = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsFetchingData(true);
        const response = await getRequest(url);
        setResponse(response);
      } catch (e: any) {
        setError(e);
      }
    };
    fetchData();
  }, [url, options, appContext]);
  return {
    response,
    isFetchingData,
    error
  };
};
