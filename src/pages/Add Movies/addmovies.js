import React, { useState } from "react";
import { createMovie } from "../../api/movies";
import { ToastContainer, toast } from "react-toastify";
import Header from "../../component/Header/header";
import Sidebar from "../../component/Sidebar/sidebar";
import Footer from "../../component/Footer/footer";
import Gototop from "../../component/GoToTop/gototop";
import "./addmovies.css";

export default function AddMovies() {
  const [formData, setFormData] = useState({
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
    status: "active",
  });

  // handle change for simple fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // handle change for cast
  const handleCastChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCast = [...formData.cast];
    updatedCast[index][name] = value;
    setFormData({ ...formData, cast: updatedCast });
  };

  const addCast = () => {
    setFormData({ ...formData, cast: [...formData.cast, { name: "", role: "" }] });
  };

  // handle change for awards
  const handleAwardChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAwards = [...formData.awards];
    updatedAwards[index][name] = value;
    setFormData({ ...formData, awards: updatedAwards });
  };

  const addAward = () => {
    setFormData({
      ...formData,
      awards: [...formData.awards, { name: "", year: "", category: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createMovie(formData);
      toast.success("Movie added successfully!");
      setFormData({
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
        status: "active",
      });
    } catch (err) {
      toast.error("Failed to add movie");
      console.error(err);
    }
  };

  return (
    <div className="container-fluid mt-5 mb-5">
      <div
        className="card shadow col-md-9 mx-auto">

        <div className="container text-start">
          <center><h2>ADD NEW MOVIE</h2></center>
          <form onSubmit={handleSubmit}>

            {/* Title */}
            <div className="mb-3">
              <label className="form-label required">Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label required">Description</label>
              <textarea
                name="description"
                className="form-control"
                rows="3"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Genre */}
            <div className="mb-3">
              <label className="form-label required">Genre (comma separated)</label>
              <input
                type="text"
                name="genre"
                className="form-control"
                placeholder="Action, Sci-Fi"
                value={formData.genre}
                onChange={(e) =>
                  setFormData({ ...formData, genre: e.target.value.split(",") })
                }
              />
            </div>

            {/* Director */}
            <div className="mb-3">
              <label className="form-label required">Director</label>
              <input
                type="text"
                name="director"
                className="form-control"
                value={formData.director}
                onChange={handleChange}
              />
            </div>

            {/* Cast */}
            <div className="mb-3">
              <label className="form-label required">Cast</label>
              {formData.cast.map((c, index) => (
                <div key={index} className="row mb-2">
                  <div className="col">
                    <input
                      type="text"
                      name="name"
                      placeholder="Actor Name"
                      className="form-control"
                      value={c.name}
                      onChange={(e) => handleCastChange(index, e)}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      name="role"
                      placeholder="Role"
                      className="form-control"
                      value={c.role}
                      onChange={(e) => handleCastChange(index, e)}
                    />
                  </div>
                </div>
              ))}
              <button type="button" className="btn btn-sm btn-outline-primary" onClick={addCast}>
                Add Cast
              </button>
            </div>

            {/* Rating */}
            <div className="mb-3">
              <label className="form-label required">Rating</label>
              <input
                type="number"
                name="rating"
                step="0.1"
                className="form-control"
                value={formData.rating}
                onChange={handleChange}
              />
            </div>

            {/* Duration */}
            <div className="mb-3">
              <label className="form-label required">Duration (minutes)</label>
              <input
                type="number"
                name="duration"
                className="form-control"
                value={formData.duration}
                onChange={handleChange}
              />
            </div>

            {/* Release Date */}
            <div className="mb-3">
              <label className="form-label required">Release Date</label>
              <input
                type="date"
                name="releaseDate"
                className="form-control"
                value={formData.releaseDate}
                onChange={handleChange}
              />
            </div>

            {/* Language */}
            <div className="mb-3">
              <label className="form-label required">Language</label>
              <input
                type="text"
                name="language"
                className="form-control"
                value={formData.language}
                onChange={handleChange}
              />
            </div>

            {/* Country */}
            <div className="mb-3">
              <label className="form-label required">Country</label>
              <input
                type="text"
                name="country"
                className="form-control"
                value={formData.country}
                onChange={handleChange}
              />
            </div>

            {/* Poster URL */}
            <div className="mb-3">
              <label className="form-label required">Poster URL</label>
              <input
                type="text"
                name="posterUrl"
                className="form-control"
                value={formData.posterUrl}
                onChange={handleChange}
              />
            </div>

            {/* Trailer URL */}
            <div className="mb-3">
              <label className="form-label required">Trailer URL</label>
              <input
                type="text"
                name="trailerUrl"
                className="form-control"
                value={formData.trailerUrl}
                onChange={handleChange}
              />
            </div>

            {/* Budget */}
            <div className="mb-3">
              <label className="form-label">Budget ($)</label>
              <input
                type="number"
                name="budget"
                className="form-control"
                value={formData.budget}
                onChange={handleChange}
              />
            </div>

            {/* Box Office */}
            <div className="mb-3">
              <label className="form-label">Box Office ($)</label>
              <input
                type="number"
                name="boxOffice"
                className="form-control"
                value={formData.boxOffice}
                onChange={handleChange}
              />
            </div>

            {/* Awards */}
            <div className="mb-3">
              <label className="form-label">Awards</label>
              {formData.awards.map((a, index) => (
                <div key={index} className="row mb-2">
                  <div className="col">
                    <input
                      type="text"
                      name="name"
                      placeholder="Award Name"
                      className="form-control"
                      value={a.name}
                      onChange={(e) => handleAwardChange(index, e)}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="number"
                      name="year"
                      placeholder="Year"
                      className="form-control"
                      value={a.year}
                      onChange={(e) => handleAwardChange(index, e)}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      name="category"
                      placeholder="Category"
                      className="form-control"
                      value={a.category}
                      onChange={(e) => handleAwardChange(index, e)}
                    />
                  </div>
                </div>
              ))}
              <button type="button" className="btn btn-sm btn-outline-primary" onClick={addAward}>
                Add Award
              </button>
            </div>

            {/* IMDb ID */}
            <div className="mb-3">
              <label className="form-label required">IMDb ID</label>
              <input
                type="text"
                name="imdbId"
                className="form-control"
                value={formData.imdbId}
                onChange={handleChange}
              />
            </div>

            {/* Status */}
            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                name="status"
                className="form-control"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-success w-100" >
              Save Movie
            </button>
          </form>
        </div>
        <ToastContainer position="top-right" autoClose={3500} />
      </div>
    </div>
  );
}
