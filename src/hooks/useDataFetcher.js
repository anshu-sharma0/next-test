import useSWR from 'swr';

const useDataFetcher = (query, fetcher) => {
  const { data, isLoading } = useSWR(query, fetcher, {
    refreshInterval: 15000,
    revalidateOnFocus: true,
    keepPreviousData: true,
  });

  return { data, isLoading };
};

export default useDataFetcher;
