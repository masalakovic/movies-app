import React, {useRef, useState} from 'react';
import {MovieTabType} from '../../enums';
import {Movie, PageResponse} from '../../api/types';
import useFetchMovies from '../../hooks/useFetchMovies';
import MoviesScroll from './MoviesScroll';
import {
  getPopularMovies,
  getUpcomingMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
} from '../../api/moviesServices';
import {ButtonVariant} from '../../enums';
import Button from '../shared/Button';

const tabOptions: {
  label: string;
  key: MovieTabType;
  fetchFn: (page: number) => Promise<PageResponse<Movie>>;
}[] = [
  {
    label: 'Popular',
    key: MovieTabType.POPULAR,
    fetchFn: getPopularMovies,
  },
  {
    label: 'Upcoming',
    key: MovieTabType.UPCOMING,
    fetchFn: getUpcomingMovies,
  },
  {
    label: 'Top Rated',
    key: MovieTabType.TOP_RATED,
    fetchFn: getTopRatedMovies,
  },
  {
    label: 'Now Playing',
    key: MovieTabType.NOW_PLAYING,
    fetchFn: getNowPlayingMovies,
  },
];

const MovieTabs: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [activeTab, setActiveTab] = useState<MovieTabType>(
    MovieTabType.POPULAR
  );

  const currentTab = tabOptions.find((tab) => tab.key === activeTab)!;

  const {
    data: movies,
    loading,
    fetchNext,
    hasMore,
  } = useFetchMovies(currentTab.fetchFn, activeTab);

  const handleTabChange = (key: MovieTabType) => {
    setActiveTab(key);
    scrollRef.current?.scrollTo({top: 0, behavior: 'smooth'});
  };

  return (
    <>
      {/* tabs */}
      <nav className="flex bg-white dark:bg-zinc-700 justify-center gap-4 sm:gap-8 py-3 border-b border-gray-300 px-4 sm:px-8">
        {tabOptions.map(({label, key}, index) => {
          const isLast = index === tabOptions.length - 1;

          return (
            <div
              key={key}
              className={`${
                !isLast
                  ? 'pr-4 sm:pr-8 border-r border-zinc-700 dark:border-zinc-300'
                  : ''
              }`}
            >
              <Button
                onClick={() => handleTabChange(key)}
                variant={
                  key === activeTab
                    ? ButtonVariant.SECONDARY
                    : ButtonVariant.MUTED
                }
              >
                {label}
              </Button>
            </div>
          );
        })}
      </nav>

      {/* scroll container */}
      <div
        id="scrollableDiv"
        className="h-[calc(100vh-125px)] overflow-auto"
        ref={scrollRef}
      >
        <MoviesScroll
          movies={movies}
          hasMore={hasMore}
          fetchNext={fetchNext}
          scrollTargetId="scrollableDiv"
          loading={loading}
        />
      </div>
    </>
  );
};

export default MovieTabs;
