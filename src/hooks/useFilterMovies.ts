import {useEffect, useState, RefObject} from 'react';
import {getFilteredMovies} from '../api/moviesServices';
import {Movie} from '../api/types';

const useFilterMovies = (
  genreId?: number,
  year?: number,
  scrollRef?: RefObject<HTMLDivElement | null>
) => {
  const [data, setData] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const shouldFetch = !!genreId || !!year;

  const fetchMovies = async (pageNum: number) => {
    setLoading(true);

    try {
      const response = await getFilteredMovies({genreId, year, page: pageNum});
      if (pageNum === 1) {
        scrollRef?.current?.scrollTo({top: 0, behavior: 'smooth'});
        setData(response.results);
      } else {
        setData((prev) => [...prev, ...response.results]);
      }

      setHasMore(pageNum < response.total_pages);
    } catch (error) {
      console.error('Error fetching filtered movies', error);
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
  }, [genreId, year]);

  return {data, hasMore, fetchNextPage, loading};
};

export default useFilterMovies;
