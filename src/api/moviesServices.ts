import api from './axios';
import {
  FilterParams,
  Movie,
  MovieDetails,
  MovieCredits,
  MovieVideos,
  Genre,
  ProviderResponse,
  PageResponse,
} from './types';

// get popular movies
export const getPopularMovies = async (
  page = 1
): Promise<PageResponse<Movie>> => {
  const response = await api.get(`/movie/popular`, {
    params: {page},
  });
  return response.data;
};

//get now playing
export const getNowPlayingMovies = async (
  page = 1
): Promise<PageResponse<Movie>> => {
  const response = await api.get(`/movie/now_playing`, {
    params: {page},
  });
  return response.data;
};

//get upcoming movies
export const getUpcomingMovies = async (
  page = 1
): Promise<PageResponse<Movie>> => {
  const response = await api.get(`/movie/upcoming`, {
    params: {page},
  });
  return response.data;
};

// get top rated movies
export const getTopRatedMovies = async (
  page = 1
): Promise<PageResponse<Movie>> => {
  const response = await api.get(`/movie/top_rated`, {
    params: {page},
  });
  return response.data;
};

// get movie by id
export const getMovieById = async (id: string): Promise<MovieDetails> => {
  const response = await api.get(`/movie/${id}`);
  return response.data;
};

// get movie credits
export const getMovieCredits = async (id: string): Promise<MovieCredits> => {
  const response = await api.get(`/movie/${id}/credits`);
  return response.data;
};

// get movie videos
export const getMovieVideos = async (id: string): Promise<MovieVideos> => {
  const response = await api.get(`/movie/${id}/videos`);
  return response.data;
};

// get movie providers
export const getMovieProviders = async (
  id: string | number
): Promise<ProviderResponse> => {
  const response = await api.get(`/movie/${id}/watch/providers`);
  return response.data;
};

//get  genres
export const getGenres = async (): Promise<Genre[]> => {
  const response = await api.get('/genre/movie/list');
  return response.data.genres;
};

// get filtered  movies
export const getFilteredMovies = async ({
  page = 1,
  genreId,
  year,
}: FilterParams): Promise<PageResponse<Movie>> => {
  const response = await api.get('/discover/movie', {
    params: {
      page,
      with_genres: genreId,
      primary_release_year: year,
    },
  });
  return response.data;
};

// get searched Movies
export const getSearchedMovies = async (
  query: string,
  page = 1
): Promise<PageResponse<Movie>> => {
  const response = await api.get(`/search/movie`, {
    params: {
      query,
      page,
    },
  });
  return response.data;
};
