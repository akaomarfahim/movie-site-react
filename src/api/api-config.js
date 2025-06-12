const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BEARER = import.meta.env.VITE_TMDB_BEARER;
const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const TMDB_IMAGE_BASE = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

export const API_CONFIG = {
    baseURL: TMDB_BASE_URL,
    apiKey: TMDB_API_KEY,
    bearer: TMDB_BEARER,
    imageBaseURL: TMDB_IMAGE_BASE,
    endpoints: {
        popularMovies: (page) => `/movie/popular?page=${page || 1}`,
        movieDetails: (id) => `/movie/${id}?language=en-US`,
        searchMovies: (query) => `/search/movie?query=${encodeURIComponent(query)}`,
    },
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_BEARER}`,
    },
};
