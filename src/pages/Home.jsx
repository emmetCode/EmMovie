import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import SkeletonCard from "../components/SkeletonCard";
import {
  fetchPopularMovies,
  fetchTopRated,
  fetchUpcoming,
  fetchNowPlaying,
  searchMovies,
} from "../services/api";

const CATEGORIES = [
  { key: "popular", label: "Popular" },
  { key: "top_rated", label: "Top Rated" },
  { key: "upcoming", label: "Upcoming" },
  { key: "now_playing", label: "Now Playing" },
];

const fetchers = {
  popular: fetchPopularMovies,
  top_rated: fetchTopRated,
  upcoming: fetchUpcoming,
  now_playing: fetchNowPlaying,
};

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const [category, setCategory] = useState("popular");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      let data;
      if (searchQuery) {
        data = await searchMovies(searchQuery, page);
      } else {
        data = await fetchers[category](page);
      }
      setMovies(data.results || []);
      setTotalPages(Math.min(data.total_pages || 1, 500));
    } catch {
      setError("Failed to load movies. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [category, page, searchQuery]);

  useEffect(() => {
    setPage(1);
  }, [category, searchQuery]);

  useEffect(() => {
    load();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [load]);

  const clearSearch = () => {
    setSearchParams({});
    setPage(1);
  };

  return (
    <main className="home">
      {searchQuery ? (
        <div className="search-header">
          <h2>Results for "{searchQuery}"</h2>
          <button onClick={clearSearch} className="clear-btn">
            ✕ Clear
          </button>
        </div>
      ) : (
        <div className="category-tabs">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              className={`tab-btn ${category === c.key ? "active" : ""}`}
              onClick={() => {
                setCategory(c.key);
                setPage(1);
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      {error && <p className="error-msg">{error}</p>}

      <div className="movies-grid">
        {loading
          ? Array.from({ length: 20 }).map((_, i) => <SkeletonCard key={i} />)
          : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>

      {!loading && movies.length === 0 && !error && (
        <p className="no-results">No movies found.</p>
      )}

      {!loading && totalPages > 1 && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            ← Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next →
          </button>
        </div>
      )}
    </main>
  );
}
