import {useState, useEffect} from 'react';
import {PageResponse} from '../api/types';

const useFetchMovies = <T>(
  fetchFn: (page: number) => Promise<PageResponse<T>>,
  shouldRerender?: string
) => {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetch = async (pageToFetch: number) => {
    setLoading(true);
    try {
      const res = await fetchFn(pageToFetch);
      setData((prev) =>
        pageToFetch === 1 ? res.results : [...prev, ...res.results]
      );
      setHasMore(pageToFetch < res.total_pages);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNext = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetch(nextPage);
    }
  };

  useEffect(() => {
    setData([]);
    setPage(1);
    setHasMore(true);
    fetch(1);
  }, [shouldRerender]);

  return {data, loading, fetchNext, hasMore};
};

export default useFetchMovies;
