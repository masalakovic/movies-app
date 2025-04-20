import {useEffect, useState, RefObject} from 'react';
import {getSearchedMovies} from '../api/moviesServices';
import {Movie} from '../api/types';

const useSearchMovies = (
  query: string,
  scrollRef?: RefObject<HTMLDivElement | null>
) => {
  const [data, setData] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const shouldFetch = query.trim().length > 0;

  const fetchMovies = async (pageNum: number) => {
    if (!shouldFetch) return;

    setLoading(true);

    try {
      const response = await getSearchedMovies(query, pageNum);
      if (pageNum === 1) {
        scrollRef?.current?.scrollTo({top: 0, behavior: 'smooth'});
        setData(response.results);
      } else {
        setData((prev) => [...prev, ...response.results]);
      }
      setHasMore(pageNum < response.total_pages);
    } catch (error) {
      console.error('Error fetching searched movies', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNextPage = () => {
    if (!loading && hasMore && shouldFetch) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMovies(nextPage);
    }
  };

  useEffect(() => {
    if (shouldFetch) {
      setData([]);
      setPage(1);
      setHasMore(true);
      fetchMovies(1);
    }
  }, [query]);

  return {data, hasMore, fetchNextPage, loading};
};

export default useSearchMovies;
