import {db} from '../firebase/firebase';
import {doc, setDoc, getDoc} from 'firebase/firestore';
import {Movie} from '../api/types';

export const saveUserData = async (
  userId: string,
  watchList: Movie[],
  favorites: Movie[]
) => {
  const userDoc = doc(db, 'users', userId);
  await setDoc(userDoc, {watchList, favorites}, {merge: true});
};

export const getUserData = async (
  userId: string
): Promise<{
  watchList: Movie[];
  favorites: Movie[];
}> => {
  const userDoc = doc(db, 'users', userId);
  const snapshot = await getDoc(userDoc);

  if (snapshot.exists()) {
    const data = snapshot.data();
    return {
      watchList: data.watchList || [],
      favorites: data.favorites || [],
    };
  }
  return {watchList: [], favorites: []};
};
