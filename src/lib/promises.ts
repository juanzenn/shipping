import { useCallback, useState } from "react";

export function usePromise<T>(cb: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const data = await cb();
      setData(data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [cb]);

  return { data, error, loading, execute };
}
