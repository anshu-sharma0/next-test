import { useState, useEffect } from 'react';
import { fetchApi } from '../lib/fetchApi';

function useFetch(apiEndpoint, options) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(!!apiEndpoint);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!apiEndpoint) return;

    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchApi(apiEndpoint, options);
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Something went wrong');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [apiEndpoint]);

  return { data, loading, error };
}

export default useFetch;
