const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BEARER = import.meta.env.VITE_TMDB_BEARER;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const TMDB_IMAGE_BASE = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

const POPULAR_MOVIES_URL = `${BASE_URL}/movie/popular`
const MOVIE_SEARCH_URL = `${BASE_URL}/search/movie?query=qr`
const MOVIE_DETAILS_URL = `${BASE_URL}/movie/movie_id?language=en-US`


const options = {
    // method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + BEARER
    }
};


export const getPopularMovies = async () => {
    const response = await fetch(POPULAR_MOVIES_URL, options);
    const data = await response.json();
    return data.results;
}

export const getPosterPath = (movie) => {
    return `${TMDB_IMAGE_BASE}/${movie.poster_path}`
}

export const getSearchedMovies = async (query) => {
    const searchApi = MOVIE_SEARCH_URL.replace('qr', encodeURIComponent(query));

    const response = await fetch(searchApi, options);
    const data = await response.json();
    return data.results;
}

export const getMovieDetails = async (id) => {
    const detailsApi = MOVIE_DETAILS_URL.replace('movie_id', id);

    console.log('URL _   ' + detailsApi);
    console.log('OPTIONS _  ' + options);

    const response = await fetch(detailsApi, options);
    const data = await response.json();
    console.log('DATA = ' + data);

    return data;

}