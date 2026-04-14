const API_KEY = "e4bb9158e2711b67dbf9470c51aad497";
const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
export const BACKDROP_BASE = "https://image.tmdb.org/t/p/original";

const get = (path) =>
  fetch(
    `${BASE_URL}${path}${path.includes("?") ? "&" : "?"}api_key=${API_KEY}`,
  ).then((r) => r.json());

export const fetchPopularMovies = (page = 1) =>
  get(`/movie/popular?page=${page}`);
export const fetchTopRated = (page = 1) => get(`/movie/top_rated?page=${page}`);
export const fetchUpcoming = (page = 1) => get(`/movie/upcoming?page=${page}`);
export const fetchNowPlaying = (page = 1) =>
  get(`/movie/now_playing?page=${page}`);
export const searchMovies = (query, page = 1) =>
  get(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`);
export const getMovieDetails = (id) =>
  get(`/movie/${id}?append_to_response=credits,videos,similar`);
export const fetchGenres = () => get(`/genre/movie/list`);
export const fetchByGenre = (genreId, page = 1) =>
  get(`/discover/movie?with_genres=${genreId}&page=${page}`);
