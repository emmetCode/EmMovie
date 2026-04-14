import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFavorites } from "../context/FavoritesContext";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { favorites } = useFavorites();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/?search=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        🎬 EmMovie
      </Link>

      <form onSubmit={handleSearch} className="nav-search">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <Link to="/favorites" className="nav-favorites">
        ❤️ Favorites
        {favorites.length > 0 && (
          <span className="badge">{favorites.length}</span>
        )}
      </Link>
    </nav>
  );
}
