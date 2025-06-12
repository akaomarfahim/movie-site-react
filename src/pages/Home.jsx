import "../styles/Home.css";
import { useState, useEffect, lazy, Suspense } from "react";
import { MovieService } from "../api/MovieServices";

const MovieCard = lazy(() => import("../components/MovieCard"));
const MovieCardShimmer = lazy(() => import("../components/MovieCardShimmer"));

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load popular movies on mount and when searchQuery is cleared
  useEffect(() => {
    let isMounted = true;

    const loadPopularMovies = async () => {
      if (isMounted) setLoading(true);
      try {
        const { popularMovies, currentPage, totalPages } = await MovieService.getPopularMovies();
        setPage(currentPage);
        setTotalPages(totalPages);
        if (isMounted) {
          setMovies((prevMovies) => [...prevMovies, ...popularMovies]);
          setError(null);
        }
      } catch (err) {
        console.error("Failed to load popular movies:", err);
        if (isMounted) setError("Failed to load popular movies.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (searchQuery.trim() === "") {
      loadPopularMovies();
    }

    return () => {
      isMounted = false;
    };
  }, [searchQuery]);

  // Handle search form submission
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim() || loading) return;

    setLoading(true);
    try {
      const searchedMovies = await MovieService.getSearchedMovies(searchQuery);
      setMovies(searchedMovies);
      setError(null);
    } catch (err) {
      console.error("Failed to search movies:", err);
      setError("Failed to search movies.");
    } finally {
      setLoading(false);
    }
  };

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
