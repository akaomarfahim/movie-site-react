import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import "../css/MovieDetails.css";
import { getMovieDetails, getPosterPath } from "../services/api_services";
import { ShimmerDiv } from "shimmer-effects-react";

const MovieDetailsScreen = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  const loadMovieDetails = useCallback(async () => {
    try {
      const movie = await getMovieDetails(id);
      setMovie(movie);
    } catch (error) {
      console.log("Error getting movie details: " + error);
      setError("Error getting movie details...");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadMovieDetails();
  }, [loadMovieDetails]);

  //   Loading
  if (loading) return <h2>Loading...</h2>;

  //   Error
  if (error) return <h2>Error getting movie details.</h2>;

  return (
    <div>
      {movie ? (
        <div>
          <ShimmerDiv mode="dark" height={100} width={100} loading={true} />
          <div className="movie-details">
            <div className="movie-poster">
              <img src={getPosterPath(movie)} alt={movie.title} />
            </div>
            <div>
              <h3>{movie.title}</h3>
            </div>
          </div>
        </div>
      ) : (
        <h2>No movie data found.</h2>
      )}
    </div>
  );
};

export default MovieDetailsScreen;
