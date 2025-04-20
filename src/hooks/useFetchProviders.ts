import {useCallback, useEffect, useState} from 'react';
import {getMovieProviders} from '../api/moviesServices';
import {CountryProvider} from '../api/types';

const useFetchProviders = (
  movieId: string | number,
  shouldRender: boolean,
  countryCode: string = 'US'
) => {
  const [data, setData] = useState<CountryProvider | null>(null);
  const [loading, setLoading] = useState(false);

  const fetch = useCallback(async () => {
    if (!shouldRender) return;

    setLoading(true);
    try {
      const result = await getMovieProviders(movieId);
      const selectedCountry = result.results?.[countryCode] || null;
      setData(selectedCountry ?? null);
    } catch (error) {
      console.error('Error fetching providers:', error);
    } finally {
      setLoading(false);
    }
  }, [movieId, shouldRender, countryCode]);

  useEffect(() => {
    fetch();
  }, []);

  return {data, loading, fetch};
};

export default useFetchProviders;
