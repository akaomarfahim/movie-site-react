import dayjs from "dayjs";
import "../css/MovieCard.css";
import { getPosterPath } from "../services/api_services";
import { useMovieContext } from "../context/MovieContext";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie);

  function onTapFavorite(e) {
    e.preventDefault();
    if (favorite) removeFromFavorites(movie);
    else addToFavorites(movie);
  }

  const releaseDate = dayjs(new Date(movie.release_date)).format("YYYY MMMM DD");

  return (
    <Link to={`/details/${movie.id}`}>
      <div className="movie-card">
        <div className="movie-poster">
          <img src={getPosterPath(movie)} alt={movie.title} />
          <div className="movie-overlay">
            <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onTapFavorite}>
              ♥
            </button>
          </div>
          <div></div>
        </div>
        <div className="movie-info">
          <h3>{movie.title ?? <Skeleton></Skeleton>}</h3>
          <p>{releaseDate}</p>
          <p className="two-line-ellipsis">{movie.overview}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;

// <ShimmerDiv className="movie-card" mode="dark" height="600px" width="100%" loading={true}></ShimmerDiv>
