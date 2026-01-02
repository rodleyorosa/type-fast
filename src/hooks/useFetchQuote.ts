import { useCallback, useEffect, useState } from "react";

export const useFetchQuote = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setData(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setHasError(true);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, hasError, refetch: fetchData };
};
