import {createContext} from 'react';
import type {User} from 'firebase/auth';
import type {Movie} from '../api/types';

export interface UserContextType {
  user: User | null;
  addUser: (user: User) => void;
  removeUser: () => void;
  watchList: Movie[];
  addToWatchList: (movie: Movie) => void;
  removeFromWatchList: (movieId: number) => void;
  favorites: Movie[];
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: number) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);
