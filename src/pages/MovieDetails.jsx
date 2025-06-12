import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { MovieService } from "../api/MovieServices";
import "../css/MovieDetails.css";

/**
 * MovieDetailsScreen Component
 * Displays detailed information about a specific movie
 */
const MovieDetailsScreen = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadMovieDetails = useCallback(async () => {
    if (!id) {
      setError("Movie ID is required");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const movieData = await MovieService.getMovieDetails(id);

      if (!movieData) {
        throw new Error("No movie data received");
      }

      setMovie(movieData);
    } catch (err) {
      console.error("Error fetching movie details:", err);
      setError(err.message || "Failed to load movie details");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadMovieDetails();
  }, [loadMovieDetails]);

  // Loading state
  if (loading) {
    return (
      <main className="movie-details-container">
        <div className="movie-details-overlay" aria-hidden="true" />

        <div className="movie-details-content">
          {/* Shimmer Poster */}
          <section className="movie-poster-section" aria-label="Loading poster">
            <div className="shimmer-poster shimmer" aria-hidden="true"></div>
          </section>

          {/* Shimmer Movie Info */}
          <section className="movie-info-section">
            <div className="movie-info-content">
              {/* Title shimmer */}
              <div className="shimmer-title shimmer" aria-hidden="true"></div>

              {/* Tagline shimmer */}
              <div className="shimmer-tagline shimmer" aria-hidden="true"></div>

              {/* Metadata shimmer */}
              <div className="shimmer-metadata">
                <div className="shimmer-meta-item shimmer" aria-hidden="true"></div>
                <div className="shimmer-meta-item shimmer" aria-hidden="true"></div>
                <div className="shimmer-meta-item shimmer" aria-hidden="true"></div>
              </div>

              {/* Genres shimmer */}
              <div className="shimmer-genres">
                <div className="shimmer-genre shimmer" aria-hidden="true"></div>
                <div className="shimmer-genre shimmer" aria-hidden="true"></div>
                <div className="shimmer-genre shimmer" aria-hidden="true"></div>
              </div>

              {/* Overview shimmer */}
              <div className="shimmer-overview">
                <div className="shimmer-overview-title shimmer" aria-hidden="true"></div>
                <div className="shimmer-overview-line shimmer" aria-hidden="true"></div>
                <div className="shimmer-overview-line shimmer" aria-hidden="true"></div>
                <div className="shimmer-overview-line shimmer" aria-hidden="true"></div>
                <div className="shimmer-overview-line shimmer" aria-hidden="true"></div>
              </div>
            </div>
          </section>
        </div>

        <div className="loading-status" role="status" aria-live="polite">
          <span className="sr-only">Loading movie details...</span>
        </div>
      </main>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="movie-details-error" role="alert">
        <h2>Unable to load movie details</h2>
        <p>{error}</p>
        <button className="retry-button" onClick={loadMovieDetails} aria-label="Retry loading movie details">
          Try Again
        </button>
      </div>
    );
  }

  // No movie data
  if (!movie) {
    return (
      <div className="movie-details-empty">
        <h2>Movie not found</h2>
        <p>The requested movie could not be found.</p>
      </div>
    );
  }

  const posterUrl = MovieService.getPosterPath(movie);
  const movieTitle = movie.title || "Unknown Title";

  return (
    <main className="movie-details-container">
      {/* Background Image */}
      {posterUrl && (
        <div className="movie-details-background" style={{ backgroundImage: `url(${posterUrl})` }} aria-hidden="true" />
      )}

      {/* Overlay */}
      <div className="movie-details-overlay" aria-hidden="true" />

      {/* Content */}
      <div className="movie-details-content">
        {/* Movie Poster */}
        <section className="movie-poster-section" aria-labelledby="movie-title">
          {posterUrl ? (
            <img src={posterUrl} alt={`${movieTitle} poster`} className="movie-poster-image" loading="lazy" />
          ) : (
            <div className="movie-poster-placeholder" aria-label="No poster available">
              <span>No Image</span>
            </div>
          )}
        </section>

        {/* Movie Information */}
        <section className="movie-info-section">
          <div className="movie-info-content">
            <h1 id="movie-title" className="movie-title">
              {movieTitle}
            </h1>

            {movie.tagline && <p className="movie-tagline">{movie.tagline}</p>}

            <div className="movie-metadata">
              {movie.release_date && <span className="movie-year">{new Date(movie.release_date).getFullYear()}</span>}

              {movie.runtime && (
                <span className="movie-runtime">
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </span>
              )}

              {movie.vote_average && <span className="movie-rating">⭐ {movie.vote_average.toFixed(1)}/10</span>}
            </div>

            {movie.genres && movie.genres.length > 0 && (
              <div className="movie-genres">
                {movie.genres.map((genre) => (
                  <span key={genre.id} className="genre-tag">
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {movie.overview && (
              <div className="movie-overview">
                <h2>Overview</h2>
                <p>{movie.overview}</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default MovieDetailsScreen;
