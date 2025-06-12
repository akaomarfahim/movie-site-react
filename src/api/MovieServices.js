import { API_CONFIG } from "./api-config";

const fetchFromTMDB = async (endpoint) => {
    try {
        const url = `${API_CONFIG.baseURL}${endpoint}`;
        const response = await fetch(url, { headers: API_CONFIG.headers });

        if (!response.ok) {
            throw new Error(`TMDB API error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching from TMDB:", error);
        return null;
    }
};

export const MovieService = {
    // getPopularMovies: async () => {
    //     const data = await fetchFromTMDB(API_CONFIG.endpoints.popularMovies);
    //     return data?.results || [];
    // },

    getPopularMovies: async (page = 1) => {
        const endpoint = API_CONFIG.endpoints.popularMovies();
        const data = await fetchFromTMDB(endpoint);
        return {
            popularMovies: data?.results || [],
            currentPage: data?.page || page,
            totalPages: data?.total_pages || 1,
        };
    },


    getMovieDetails: async (id) => {
        const endpoint = API_CONFIG.endpoints.movieDetails(id);
        return await fetchFromTMDB(endpoint);
    },

    getSearchedMovies: async (query) => {
        const endpoint = API_CONFIG.endpoints.searchMovies(query);
        const data = await fetchFromTMDB(endpoint);
        return data?.results || [];
    },

    getPosterPath: (movie) => {
        return movie.poster_path ? `${API_CONFIG.imageBaseURL}/${movie.poster_path}` : null;
    },
};
