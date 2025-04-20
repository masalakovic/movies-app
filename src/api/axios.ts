import axios from 'axios';
import {BASE_URL} from '../constants';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
  },
  params: {
    language: 'en-US',
  },
});

export default api;
