import {useParams} from 'react-router-dom';
import useFullMovieData from '../hooks/useFetchMovie';
import Rating from '../components/shared/Rating';
import Loader from '../components/shared/Loader';
import ToggleButton from '../components/shared/ToggleButton';
import {
  IMG_BASE_URL,
  IMG_BASE_URL_ORIGINAL,
  YOUTUBE_EMBED_BASE_URL,
} from '../constants';
import {ListType} from '../enums';

const MoviePage: React.FC = () => {
  const {id} = useParams();
  const {
    data: movie,
    cast,
    directors,
    trailerKey,
    loading,
  } = useFullMovieData(id);

  if (loading || !movie) return <Loader />;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${IMG_BASE_URL_ORIGINAL}${movie.backdrop_path})`,
        }}
      />
      <div className="absolute inset-0 bg-black/10 z-0" />

      {/* main content */}
      <div className="relative z-10">
        <div className="hidden md:block h-[40vh]" />
        <div className="relative bg-white/50 dark:text-zinc-50 dark:bg-zinc-950/60 backdrop-blur-xs px-4 md:px-10 py-10 md:py-16 rounded-none md:rounded-t-3xl shadow-lg">
          <div className="max-w-6xl mx-auto  relative">
            {/*poster */}
            <div className="flex justify-center md:justify-end mb-8">
              <img
                src={`${IMG_BASE_URL}w500${movie.poster_path}`}
                alt={movie.title}
                className="w-64 md:w-72 rounded-xl relative md:absolute md:-top-50 md:right-0"
              />
            </div>

            <div className="md:pr-[320px] flex flex-col gap-8 mb-8">
              <h1>{movie.title}</h1>
              <p className="max-w-2xl">{movie.overview}</p>
              {/* rate */}
              <Rating vote={movie.vote_average} />

              {/* buttons to add to watchlist or favorites */}
              <div className="flex gap-4 flex-wrap">
                <ToggleButton
                  type={ListType.FAVORITES}
                  movie={movie}
                  hasLabel
                />
                <ToggleButton
                  type={ListType.WATCH_LIST}
                  movie={movie}
                  hasLabel
                />
              </div>
            </div>

            {/* genres */}
            <div className="mb-8">
              <h4 className="mb-2">Genres</h4>
              {movie.genres.length > 0 ? (
                <p className="font-semibold">
                  {movie.genres.map((genre) => genre.name).join(', ')}
                </p>
              ) : (
                <p className="text-zinc-500 italic">Unknown</p>
              )}
            </div>

            {/* director */}
            <div className="mb-8">
              <h4 className="mb-2">Directed by</h4>
              {directors.length > 0 ? (
                <p className="font-semibold">{directors.join(', ')}</p>
              ) : (
                <p className="text-zinc-500 italic">Unknown</p>
              )}
            </div>

            {/* cast */}
            <div className="mb-8">
              <h4 className="mb-2">Main Cast</h4>
              <div className="flex gap-2 flex-wrap">
                {cast.map((actor, index) => (
                  <p
                    key={actor.name}
                    className="font-semibold whitespace-nowrap"
                  >
                    <span>{actor.name}</span>
                    <i className="text-zinc-600"> ({actor.character})</i>
                    {index < cast.length - 1 && ','}
                  </p>
                ))}
              </div>
            </div>

            {/* trailer */}
            {trailerKey && (
              <div className="w-full">
                <h4 className="mb-2">Watch trailer</h4>
                <div className="relative w-full pb-[56.25%] h-0 overflow-hidden rounded-xl">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-xl"
                    src={`${YOUTUBE_EMBED_BASE_URL}${trailerKey}`}
                    title="YouTube trailer"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
