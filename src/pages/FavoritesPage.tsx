import useUser from '../context/useUser';
import MovieCard from '../components/fragments/MovieCard';

const FavoritesPage: React.FC = () => {
  const {favorites} = useUser();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Favorites</h1>

      {favorites.length === 0 ? (
        <p className="text-zinc-600">You have no favorite movies.</p>
      ) : (
        <ul className="grid p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 list-none">
          {favorites.map((movie) => (
            <li key={movie.id}>
              <MovieCard movie={movie} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesPage;
