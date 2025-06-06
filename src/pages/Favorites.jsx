import "../css/Home.css";
import MovieCard from "../components/movie-card";
import { useMovieContext } from "../context/MovieContext";

const FavoritesScreen = () => {
  const { favorites } = useMovieContext();

  if (favorites && favorites.length > 0) {
    return (
      <div className="favorites">
        <h2>Your Favorite Movies </h2>
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-empty">
      <h2>No movies added as favorite yet.</h2>
      <p>Start adding movies as your favorite, which will appear here!</p>
    </div>
  );
};

export default FavoritesScreen;
