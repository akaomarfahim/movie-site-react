import "../css/Home.css";
import { useState, useEffect, lazy, Suspense } from "react";
import { getPopularMovies, getSearchedMovies } from "../services/api_services";

const MovieCard = lazy(() => import("../components/MovieCard"));
const MovieCardShimmer = lazy(() => import("../components/MovieCardShimmer"));

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load Popular Movies
  const loadPopularMovies = async () => {
    try {
      const popularMovies = await getPopularMovies();
      setMovies(popularMovies);
    } catch (error) {
      console.log(`Failed to load movies, error: ${error}`);
      setError("Failed to load movies...");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPopularMovies();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") loadPopularMovies();
  }, [searchQuery]);

  async function handleSearch(e) {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;
    setLoading(true);
    try {
      const searchedMovies = await getSearchedMovies(searchQuery);
      setMovies(searchedMovies);
      setError(null);
    } catch (error) {
      console.log("Failed to get searched movies: " + error);
      setError("Failed to get searched movies...");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="home">
      {/* Search Input */}
      <form onSubmit={handleSearch} className="search-form" action="">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for movie..."
          className="search-input"
        />
        <button type="submit" className="button">
          Search
        </button>
      </form>

      {/* on Error */}
      {error && <div className="error-message">{error}</div>}

      {/*on Loading */}
      {loading ? (
        <div className="movies-grid">
          {Array.from({ length: 12 }).map((_, i) => (
            <MovieCardShimmer movie={_} key={i} />
          ))}
        </div>
      ) : (
        //Wrap MovieCard usage with Suspense
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

// //Wrap MovieCard usage with Suspense
// <Suspense
//   fallback={
//     <div className="movies-grid">
//       <div>Loading....</div>
//       {Array.from({ length: 12 }).map((_, i) => (
//         <MovieCardShimmer movie={_} key={i} />
//       ))}
//     </div>
//   }
// >
//   <div className="movies-grid">
//     {movies.map((movie) => (
//       <MovieCard movie={movie} key={movie.id} />
//     ))}
//   </div>
// </Suspense>
