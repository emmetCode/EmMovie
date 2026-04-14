import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { IMAGE_BASE } from "../services/api";

export default function MovieCard({ movie }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const fav = isFavorite(movie.id);
  const poster = movie.poster_path
    ? `${IMAGE_BASE}${movie.poster_path}`
    : "/fallback.jpg";

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <div className="movie-card-img-wrap">
          <img src={poster} alt={movie.title} loading="lazy" />
          <span className="movie-rating">
            ⭐ {movie.vote_average?.toFixed(1)}
          </span>
        </div>
        <div className="movie-card-info">
          <h3>{movie.title}</h3>
          <p>{movie.release_date?.slice(0, 4)}</p>
        </div>
      </Link>
      <button
        className={`fav-btn ${fav ? "fav-active" : ""}`}
        onClick={() => toggleFavorite(movie)}
        aria-label={fav ? "Remove from favorites" : "Add to favorites"}
      >
        {fav ? "❤️" : "🤍"}
      </button>
    </div>
  );
}
