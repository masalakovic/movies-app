import {Movie, MovieDetails} from './api/types';
import {SelectOption} from './components/shared/Select';
import {GENRE_KEY, THEME_KEY} from './constants';

// genres
export const saveGenresToStorage = (genres: {id: number; name: string}[]) => {
  localStorage.setItem(GENRE_KEY, JSON.stringify(genres));
};

export const getGenresFromStorage = (): {id: number; name: string}[] => {
  const raw = localStorage.getItem(GENRE_KEY);
  return raw ? JSON.parse(raw) : [];
};

// darkmode
export const saveThemeToStorage = (theme: 'light' | 'dark') => {
  localStorage.setItem(THEME_KEY, theme);
};

export const getThemeFromStorage = (): 'light' | 'dark' | null => {
  const raw = localStorage.getItem(THEME_KEY);
  if (raw === 'light' || raw === 'dark') return raw;
  return null;
};

// year options
export const generateYearOptions = (startYear = 1900): SelectOption[] => {
  const currentYear = new Date().getFullYear();
  const years: SelectOption[] = [];

  for (let year = currentYear; year >= startYear; year--) {
    years.push({
      value: year,
      label: year.toString(),
    });
  }

  return years;
};

// create movie object to add it to context
export const createMovieObjectFromMovieDetails = (
  details: MovieDetails
): Movie => ({
  id: details.id,
  title: details.title,
  poster_path: details.poster_path || '',
  backdrop_path: details.backdrop_path || '',
  overview: details.overview,
  vote_average: details.vote_average,
  release_date: details.release_date,
  original_language: details.original_language,
  original_title: details.original_title,
  adult: details.adult,
  popularity: details.popularity,
  video: details.video,
  vote_count: details.vote_count,
  genre_ids: details.genres.map((g) => g.id),
});
