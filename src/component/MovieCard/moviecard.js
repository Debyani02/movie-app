import React from "react";
import "./moviecard.css";
import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie }) {
  const {
    _id="",
    posterUrl = "https://via.placeholder.com/300x450?text=No+Poster",
    title = "Untitled",
    description = "No description available.",
    genre = [],
    director = "Unknown",
    cast = [],
    rating="",
    releaseDate = "Unknown",
  } = movie || {};

  const shortDescription =
    description.length > 150 ? description.slice(0, 147) + "..." : description;

    const navigate = useNavigate();

  return (
    <div className="movie-card card h-100 shadow-sm">
      {/* Poster */}
      <img
        src={posterUrl}
        alt={`Poster of ${title}`}
        className="card-img-top"
        style={{ height: "350px", objectFit: "cover" }}
      />

      {/* Details */}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">Director: {director}</h6>

        <div className="mb-2">
          {genre.map((g, i) => (
            <span key={i} className="badge bg-secondary me-1">
              {g}
            </span>
          ))}
        </div>

        <div className="mb-2">
            <p>IMDb:⭐{rating}</p>
        </div>

        <button
          className="btn btn-danger"
          onClick={() => navigate(`/movie/${_id}`)}
        >
          View More
        </button>
      </div>
    </div>
  );
}
