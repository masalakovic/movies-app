import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from '../shared/Loader';
import MovieCard from './MovieCard';
import {Movie} from '../../api/types';

interface MovieScrollProps {
  movies: Movie[];
  hasMore: boolean;
  fetchNext: () => void;
  scrollTargetId: string;
  loading: boolean;
}

const MovieScroll: React.FC<MovieScrollProps> = ({
  movies,
  hasMore,
  fetchNext,
  scrollTargetId,
  loading,
}) => {
  const isInitialLoading = loading && movies.length === 0;
  const isEmptyAndLoaded = !loading && movies.length === 0;

  if (isInitialLoading) {
    return <Loader />;
  }

  return (
    <InfiniteScroll
      dataLength={movies.length}
      next={fetchNext}
      hasMore={hasMore}
      loader={<Loader className="py-8" />}
      scrollableTarget={scrollTargetId}
      endMessage={
        isEmptyAndLoaded ? (
          <div className="text-center text-zinc-400 mt-[3rem] mb-8 dark:text-zinc-400">
            No movies found
          </div>
        ) : (
          <div className="text-center text-zinc-400 mt-[3rem] mb-8 dark:text-zinc-400">
            No more movies to load
          </div>
        )
      }
    >
      <ul className="grid p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 list-none">
        {movies.map((movie) => (
          <li key={movie.id}>
            <MovieCard movie={movie} />
          </li>
        ))}
      </ul>
    </InfiniteScroll>
  );
};
export default MovieScroll;
