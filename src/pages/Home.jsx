import "../css/Home.css";
import { useState, useEffect, lazy, Suspense } from "react";
import { getPopularMovies, getSearchedMovies } from "../services/api_services";

const MovieCard = lazy(() => import("../components/movie-card"));

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
        <div className="loading-message">Loading movies...</div>
      ) : (
        //Wrap MovieCard usage with Suspense
        <Suspense fallback={<div>Loading movie cards...</div>}>
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        </Suspense>
      )}
      {/* Movies Grid */}
    </div>
  );
};

export default Home;
