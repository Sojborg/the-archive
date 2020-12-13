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
        appContext.startLoading();
        setIsFetchingData(true);
        const response = await getRequest(url);
        setResponse(response);
      } catch (e) {
        setError(e);
      } finally {
        appContext.stopLoading();
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
