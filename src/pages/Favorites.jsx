import { useFavorites } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom";

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <main className="home">
      <h2 className="page-title">❤️ Your Favorites</h2>
      {favorites.length === 0 ? (
        <div className="empty-state">
          <p>No favorites yet.</p>
          <Link to="/" className="back-link">
            Browse movies →
          </Link>
        </div>
      ) : (
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </main>
  );
}
