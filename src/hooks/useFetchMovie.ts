import {useEffect, useState, useCallback} from 'react';
import {
  getMovieById,
  getMovieCredits,
  getMovieVideos,
} from '../api/moviesServices';
import {MovieDetails, CastMember, CrewMember, MovieVideo} from '../api/types';

const useFullMovieData = (id: string | undefined) => {
  const [data, setData] = useState<MovieDetails | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [directors, setDirectors] = useState<string[]>([]);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    if (!id) return;

    setLoading(true);

    // fetch movie
    try {
      const movie = await getMovieById(id);
      setData(movie);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }

    // fetch credits
    try {
      const credits = await getMovieCredits(id);
      setCast(credits.cast.slice(0, 6));
      const directorList = credits.crew
        .filter((crew: CrewMember) => crew.job === 'Director')
        .map((director: CrewMember) => director.name);
      setDirectors(directorList);
    } catch (error) {
      console.error('Error fetching credits:', error);
    }

    // fetch videos
    try {
      const videos = await getMovieVideos(id);
      const trailer = videos.results.find(
        (v: MovieVideo) => v.type === 'Trailer' && v.site === 'YouTube'
      );
      setTrailerKey(trailer?.key || null);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }

    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetch();
  }, []);

  return {
    data,
    cast,
    directors,
    trailerKey,
    loading,
    fetch,
  };
};

export default useFullMovieData;
