export const API_CONFIG = {
    baseURL: import.meta.env.VITE_TMDB_BASE_URL,
    apiKey: import.meta.env.VITE_TMDB_API_KEY,
    bearer: import.meta.env.VITE_TMDB_BEARER,
    imageBaseURL: import.meta.env.VITE_TMDB_IMAGE_BASE_URL,
    endpoints: {
        popularMovies: (page) => `/movie/popular?page=${page || 1}`,
        movieDetails: (id) => `/movie/${id}?language=en-US`,
        searchMovies: (query) => `/search/movie?query=${encodeURIComponent(query)}`,
    },
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER}`,
    },
};
