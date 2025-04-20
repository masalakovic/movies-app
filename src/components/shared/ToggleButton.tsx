import {IoIosHeart} from 'react-icons/io';
import {TbDeviceTvFilled} from 'react-icons/tb';
import useUser from '../../context/useUser';

import {createMovieObjectFromMovieDetails} from '../../utils';
import {ListType} from '../../enums';
import {Movie, MovieDetails} from '../../api/types';

interface ToggleButtonProps {
  type: ListType;
  movie: Movie | MovieDetails;
  hasLabel?: boolean;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  type,
  movie,
  hasLabel = false,
}) => {
  const {
    watchList,
    favorites,
    addToWatchList,
    removeFromWatchList,
    addToFavorites,
    removeFromFavorites,
  } = useUser();

  const isMovieDetails = (movie: Movie | MovieDetails): movie is MovieDetails =>
    'genres' in movie && !('genre_ids' in movie);

  const resolvedMovie = isMovieDetails(movie)
    ? createMovieObjectFromMovieDetails(movie)
    : movie;

  const isFavorite = type === ListType.FAVORITES;
  const isActive = isFavorite
    ? favorites.some((m) => m.id === movie.id)
    : watchList.some((m) => m.id === movie.id);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (isFavorite) {
      isActive ? removeFromFavorites(movie.id) : addToFavorites(resolvedMovie);
    } else {
      isActive ? removeFromWatchList(movie.id) : addToWatchList(resolvedMovie);
    }
  };

  const iconColor = isActive
    ? isFavorite
      ? 'text-pink-500'
      : 'text-green-500'
    : 'text-zinc-500';

  const bgColor = isActive
    ? isFavorite
      ? 'bg-pink-200'
      : 'bg-green-200'
    : 'bg-zinc-200';

  const labelText = isFavorite
    ? isActive
      ? 'Remove from Favorites'
      : 'Add to Favorites'
    : isActive
    ? 'Remove from Watch List'
    : 'Add to Watch List';

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-1 sm:gap-2 ${
        hasLabel ? 'px-4' : 'w-9 justify-center'
      } h-9 rounded-full transition cursor-pointer ${bgColor}`}
    >
      {isFavorite ? (
        <IoIosHeart className={`w-4 h-4 sm:w-5 sm:h-5 ${iconColor}`} />
      ) : (
        <TbDeviceTvFilled className={`w-4 h-4 sm:w-5 sm:h-5 ${iconColor}`} />
      )}
      {hasLabel && (
        <span className={`text-sm sm:text-base font-semibold ${iconColor}`}>
          {labelText}
        </span>
      )}
    </button>
  );
};

export default ToggleButton;
