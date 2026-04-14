import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails, IMAGE_BASE, BACKDROP_BASE } from "../services/api";
import { useFavorites } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    setLoading(true);
    setError("");
    window.scrollTo({ top: 0 });
    getMovieDetails(id)
      .then(setMovie)
      .catch(() => setError("Could not load movie details."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="detail-skeleton">
        <div className="skeleton sk-backdrop" />
        <div className="sk-info">
          <div className="skeleton sk-title" />
          <div className="skeleton sk-text" />
          <div className="skeleton sk-text short" />
        </div>
      </div>
    );
  if (error) return <p className="error-msg">{error}</p>;
  if (!movie) return null;

  const trailer = movie.videos?.results?.find(
    (v) => v.site === "YouTube" && v.type === "Trailer",
  );
  const fav = isFavorite(movie.id);
  const director = movie.credits?.crew?.find((c) => c.job === "Director");
  const cast = movie.credits?.cast?.slice(0, 8) || [];
  const similar = movie.similar?.results?.slice(0, 6) || [];
  const backdrop = movie.backdrop_path
    ? `${BACKDROP_BASE}${movie.backdrop_path}`
    : null;
  const poster = movie.poster_path
    ? `${IMAGE_BASE}${movie.poster_path}`
    : "/fallback.jpg";

  return (
    <div className="detail-page">
      {backdrop && (
        <div
          className="detail-backdrop"
          style={{ backgroundImage: `url(${backdrop})` }}
        />
      )}

      <div className="detail-content">
        <div className="detail-top">
          <img className="detail-poster" src={poster} alt={movie.title} />
          <div className="detail-meta">
            <h1>{movie.title}</h1>
            {movie.tagline && <p className="tagline">"{movie.tagline}"</p>}

            <div className="detail-tags">
              <span className="tag">⭐ {movie.vote_average?.toFixed(1)}</span>
              <span className="tag">📅 {movie.release_date?.slice(0, 4)}</span>
              <span className="tag">⏱ {movie.runtime} min</span>
              {movie.genres?.map((g) => (
                <span key={g.id} className="tag genre-tag">
                  {g.name}
                </span>
              ))}
            </div>

            <p className="overview">{movie.overview}</p>

            {director && (
              <p className="director">
                🎬 Directed by <strong>{director.name}</strong>
              </p>
            )}

            <div className="detail-actions">
              <button
                className={`fav-btn-large ${fav ? "fav-active" : ""}`}
                onClick={() => toggleFavorite(movie)}
              >
                {fav ? "❤️ Saved" : "🤍 Save to Favorites"}
              </button>
              {trailer && (
                <a
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="trailer-btn"
                >
                  ▶ Watch Trailer
                </a>
              )}
            </div>
          </div>
        </div>

        {cast.length > 0 && (
          <section className="cast-section">
            <h2>Cast</h2>
            <div className="cast-grid">
              {cast.map((member) => (
                <div key={member.id} className="cast-card">
                  <img
                    src={
                      member.profile_path
                        ? `${IMAGE_BASE}${member.profile_path}`
                        : "/avatar-fallback.jpg"
                    }
                    alt={member.name}
                  />
                  <p className="cast-name">{member.name}</p>
                  <p className="cast-char">{member.character}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {similar.length > 0 && (
          <section className="similar-section">
            <h2>Similar Movies</h2>
            <div className="movies-grid">
              {similar.map((m) => (
                <MovieCard key={m.id} movie={m} />
              ))}
            </div>
          </section>
        )}

        <Link to="/" className="back-link">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
