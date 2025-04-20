import {useEffect, useState} from 'react';
import {getGenres} from '../api/moviesServices';
import {Genre} from '../api/types';

const useFetchGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGenres = async () => {
    try {
      const data = await getGenres();
      setGenres(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  return {genres, loading, fetchGenres};
};

export default useFetchGenres;
