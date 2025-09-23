import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieById, updateMovie } from "../../api/movies";
import Gototop from "../../component/GoToTop/gototop";
import Footer from "../../component/Footer/footer";
import Header from "../../component/Header/header";

export default function UpdateMovie() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState({
    title: "",
    description: "",
    genre: [],
    director: "",
    cast: [{ name: "", role: "" }],
    rating: "",
    duration: "",
    releaseDate: "",
    language: "",
    country: "",
    posterUrl: "",
    trailerUrl: "",
    budget: "",
    boxOffice: "",
    awards: [{ name: "", year: "", category: "" }],
    imdbId: "",
    status: "active"
  });

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await getMovieById(id);
        setMovie(res?.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovie();
  }, [id]);

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleGenreChange = (e) => {
    setMovie({ ...movie, genre: e.target.value.split(",") });
  };

  const handleCastChange = (index, field, value) => {
    const newCast = [...movie.cast];
    newCast[index][field] = value;
    setMovie({ ...movie, cast: newCast });
  };

  const addCastMember = () => {
    setMovie({ ...movie, cast: [...movie.cast, { name: "", role: "" }] });
  };

  const removeCastMember = (index) => {
    const newCast = [...movie.cast];
    newCast.splice(index, 1);
    setMovie({ ...movie, cast: newCast });
  };

  const handleAwardChange = (index, field, value) => {
    const newAwards = [...movie.awards];
    newAwards[index][field] = value;
    setMovie({ ...movie, awards: newAwards });
  };

  const addAward = () => {
    setMovie({ ...movie, awards: [...movie.awards, { name: "", year: "", category: "" }] });
  };

  const removeAward = (index) => {
    const newAwards = [...movie.awards];
    newAwards.splice(index, 1);
    setMovie({ ...movie, awards: newAwards });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateMovie(id, movie);
      console.log("Response after update", res)
      alert("Updated successfuly!")
      navigate(`/movie/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-fluid text-start mt-5 mb-5">
      <Header />
      <br></br><br></br>
      <center><h2>Update Movie</h2></center>
      <div className=" card shadow container ">

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input type="text" name="title" className="form-control"
              value={movie.title} onChange={handleChange} required />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea name="description" rows="3" className="form-control"
              value={movie.description} onChange={handleChange}></textarea>
          </div>

          {/* Genre & Director */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Genre (comma separated)</label>
              <input type="text" className="form-control"
                value={movie.genre.join(",")} onChange={handleGenreChange} />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Director</label>
              <input type="text" name="director" className="form-control"
                value={movie.director} onChange={handleChange} />
            </div>
          </div>

          {/* Rating, Duration, Release Date */}
          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">Rating</label>
              <input type="number" step="0.1" name="rating" className="form-control"
                value={movie.rating} onChange={handleChange} />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Duration (min)</label>
              <input type="number" name="duration" className="form-control"
                value={movie.duration} onChange={handleChange} />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Release Date</label>
              <input type="date" name="releaseDate" className="form-control"
                value={movie.releaseDate?.substring(0, 10)} onChange={handleChange} />
            </div>
          </div>

          {/* Language & Country */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Language</label>
              <input type="text" name="language" className="form-control"
                value={movie.language} onChange={handleChange} />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Country</label>
              <input type="text" name="country" className="form-control"
                value={movie.country} onChange={handleChange} />
            </div>
          </div>

          {/* Poster & Trailer */}
          <div className="mb-3">
            <label className="form-label">Poster URL</label>
            <input type="text" name="posterUrl" className="form-control"
              value={movie.posterUrl} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Trailer URL</label>
            <input type="text" name="trailerUrl" className="form-control"
              value={movie.trailerUrl} onChange={handleChange} />
          </div>

          {/* Budget & Box Office */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Budget ($)</label>
              <input type="number" name="budget" className="form-control"
                value={movie.budget} onChange={handleChange} />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Box Office ($)</label>
              <input type="number" name="boxOffice" className="form-control"
                value={movie.boxOffice} onChange={handleChange} />
            </div>
          </div>

          {/* Awards */}
          <h5>Awards</h5>
          {movie.awards.map((award, index) => (
            <div className="row mb-2" key={index}>
              <div className="col">
                <input type="text" className="form-control" placeholder="Award Name"
                  value={award.name} onChange={(e) => handleAwardChange(index, "name", e.target.value)} />
              </div>
              <div className="col">
                <input type="number" className="form-control" placeholder="Year"
                  value={award.year} onChange={(e) => handleAwardChange(index, "year", e.target.value)} />
              </div>
              <div className="col">
                <input type="text" className="form-control" placeholder="Category"
                  value={award.category} onChange={(e) => handleAwardChange(index, "category", e.target.value)} />
              </div>
              <div className="col-auto">
                <button type="button" className="btn btn-danger"
                  onClick={() => removeAward(index)}>Remove</button>
              </div>
            </div>
          ))}
          <button type="button" className="btn btn-secondary mb-3" onClick={addAward}>+ Add Award</button>

          {/* Cast */}
          <h5>Cast</h5>
          {movie.cast.map((member, index) => (
            <div className="row mb-2" key={index}>
              <div className="col">
                <input type="text" className="form-control" placeholder="Actor Name"
                  value={member.name} onChange={(e) => handleCastChange(index, "name", e.target.value)} />
              </div>
              <div className="col">
                <input type="text" className="form-control" placeholder="Role"
                  value={member.role} onChange={(e) => handleCastChange(index, "role", e.target.value)} />
              </div>
              <div className="col-auto">
                <button type="button" className="btn btn-danger"
                  onClick={() => removeCastMember(index)}>Remove</button>
              </div>
            </div>
          ))}
          <button type="button" className="btn btn-secondary mb-3" onClick={addCastMember}>+ Add Cast</button>

          {/* IMDB & Status */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">IMDB ID</label>
              <input type="text" name="imdbId" className="form-control"
                value={movie.imdbId} onChange={handleChange} />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Status</label>
              <select name="status" className="form-select" value={movie.status} onChange={handleChange}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-5">
              <button type="submit" className="btn btn-primary w-100 mt-3 mb-3">Update Movie</button>
            </div>
            <div className="col-md-5">
              <button
                type="button"
                className="btn btn-secondary w-100 mb-4 mt-3"
                onClick={() => navigate(-1)}
              >
                Back
              </button>
            </div>
          </div>

        </form>
        <Gototop />

      </div>
      <Footer />
    </div>

  );
}
