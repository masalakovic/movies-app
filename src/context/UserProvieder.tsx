import {useState, ReactNode} from 'react';
import {User} from 'firebase/auth';
import {Movie} from '../api/types';
import {getUserData, saveUserData} from '../firebase/userDataServices';
import {UserContext} from './UserContext';

interface Props {
  children: ReactNode;
}

const UserProvider = ({children}: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [watchList, setWatchList] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const save = async (updatedWatchList: Movie[], updatedFavorites: Movie[]) => {
    if (!user || !isDataLoaded) return;
    try {
      await saveUserData(user.uid, updatedWatchList, updatedFavorites);
    } catch (error) {
      console.error('Failed to save user data:', error);
    }
  };

  const addUser = async (user: User) => {
    setUser(user);
    const data = await getUserData(user.uid);
    setWatchList(data.watchList);
    setFavorites(data.favorites);
    setIsDataLoaded(true);
  };

  const removeUser = () => {
    setUser(null);
    setWatchList([]);
    setFavorites([]);
    setIsDataLoaded(false);
  };

  const addToWatchList = (movie: Movie) => {
    setWatchList((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev;
      const updated = [...prev, movie];
      save(updated, favorites);
      return updated;
    });
  };

  const removeFromWatchList = (movieId: number) => {
    setWatchList((prev) => {
      const updated = prev.filter((m) => m.id !== movieId);
      save(updated, favorites);
      return updated;
    });
  };

  const addToFavorites = (movie: Movie) => {
    setFavorites((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev;
      const updated = [...prev, movie];
      save(watchList, updated);
      return updated;
    });
  };

  const removeFromFavorites = (movieId: number) => {
    setFavorites((prev) => {
      const updated = prev.filter((m) => m.id !== movieId);
      save(watchList, updated);
      return updated;
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        addUser,
        removeUser,
        watchList,
        addToWatchList,
        removeFromWatchList,
        favorites,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
