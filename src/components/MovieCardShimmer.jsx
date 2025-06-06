import "../css/MovieCard.css";
import { Link } from "react-router-dom";
import { ShimmerDiv, ShimmerText } from "shimmer-effects-react";

const ShimmerMovieCard = () => {
  return (
    <div className="movie-card">
      <ShimmerDiv className="movie-poster" mode="dark" loading={true} />
      <div className="movie-info">
        <h3></h3>
        <ShimmerDiv height="11px" width={100} rounded={8} mode="dark" loading={true} />
        <h3></h3>
        <ShimmerDiv height="11px" width={200} rounded={8} mode="dark" loading={true} />
        <h3></h3>
      </div>
    </div>
  );
};

export default ShimmerMovieCard;
