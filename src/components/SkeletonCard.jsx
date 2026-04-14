export default function SkeletonCard() {
  return (
    <div className="movie-card skeleton-card">
      <div className="skeleton skeleton-img" />
      <div className="movie-card-info">
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-year" />
      </div>
    </div>
  );
}
