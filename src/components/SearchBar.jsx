import { useEffect, useRef } from "react";

export default function SearchBar({ query, onChange }) {
  const ref = useRef();

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div className="search-bar-inline">
      <input
        ref={ref}
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
