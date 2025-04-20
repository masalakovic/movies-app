import React, {useMemo} from 'react';
import {Movie} from '../../api/types';
import {Link, useLocation} from 'react-router-dom';
import Rating from '../shared/Rating';
import ToggleButton from '../shared/ToggleButton';
import {IMG_BASE_URL} from '../../constants';
import useFetchProviders from '../../hooks/useFetchProviders';
import {ListType} from '../../enums';
import {getGenresFromStorage} from '../../utils';

interface MovieCardProps {
  movie: Movie;
  className?: string;
  isWatchlist?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  className,
  isWatchlist,
}) => {
  const location = useLocation();
  const isFavoritesPage = location.pathname.includes('favorites');
  const isWatchListPage = location.pathname.includes('watchlist');

  const {data: watchProviders} = useFetchProviders(
    movie.id,
    !!isWatchlist,
    'US'
  );

  const releaseYear = movie.release_date?.split('-')[0] || 'N/A';

  const genreNames = useMemo(() => {
    const genres = getGenresFromStorage();

    return movie.genre_ids?.map(
      (id) => genres.find((genre) => genre.id === Number(id))?.name
    );
  }, [movie.genre_ids]);

  return (
    <Link
      to={`/movies/${movie.id}`}
      className={`bg-white dark:bg-zinc-700 rounded-lg shadow-lg w-full flex flex-col h-full border border-zinc-300 dark:border-zinc-600 transition-transform duration-200 ease-in-out hover:scale-[1.02] ${
        className ? className.trim() : ''
      }`}
    >
      {/* poster */}
      <div className="rounded-t-lg flex items-start p-2 relative">
        <img
          src={`${IMG_BASE_URL}w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-t-lg w-full object-cover"
        />
      </div>

      <div className="flex h-full flex-col gap-y-2 px-4 pb-4">
        {/* name */}
        <h6>{movie.title}</h6>

        {/* year , genres */}
        <p className="text-zinc-500 h-full dark:text-zinc-300">
          <span>{releaseYear}</span>
          {genreNames?.length > 0 && (
            <span> &bull; {genreNames.join(', ')}</span>
          )}
        </p>

        <div className="flex items-center justify-between gap-2">
          <Rating vote={movie.vote_average} />

          <div className="flex gap-2">
            {!isFavoritesPage && (
              <ToggleButton type={ListType.WATCH_LIST} movie={movie} />
            )}
            {!isWatchListPage && (
              <ToggleButton type={ListType.FAVORITES} movie={movie} />
            )}
          </div>
        </div>

        {/* watchProviders */}
        {isWatchlist && watchProviders && (
          <div className="mt-2">
            {watchProviders.flatrate?.length ? (
              <div className="flex gap-2 flex-wrap mt-1">
                {watchProviders.flatrate.map((provider) => (
                  <img
                    key={provider.provider_id}
                    src={`${IMG_BASE_URL}w92${provider.logo_path}`}
                    alt={provider.provider_name}
                    title={provider.provider_name}
                    className="w-6 h-6 rounded hover:scale-110 transition-transform"
                  />
                ))}
              </div>
            ) : (
              <span className="text-xs text-zinc-400">
                No streaming providers
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

export default MovieCard;
