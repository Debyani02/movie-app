import React from "react";
import { useState, useEffect } from "react";
import SearchBar from "../../component/SearchBar/searchbar";
import CardList from "../../component/CardList/cardlist";
import MovieCard from "../../component/MovieCard/moviecard";
import { getMovies, getMoviesByGenre } from "../../api/movies";
import { getLatestMovies, getTopRatedMovies } from "../../api/movies";

export default function Home() {
    const [search, setSearch] = useState();
    const [genre, setGenre] = useState();
    const [movies, setMovies] = useState([]);
    const [isloading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await getMovies();
                setMovies(response?.data || []);
                console.log("This is movies response", response?.data);
            } catch (err) {
                console.error("Error fetching movies:", err);
                setError("Failed to load movies");
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovies();

    }, [])


    const handleLatest = async () => {
        try {
            setIsLoading(true)
            const res = await getLatestMovies();
            setMovies(res?.data || []);

        } catch (error) {
            console.error(error);
        }
        finally {
            setIsLoading(false)
        }

    }

    const handleGenreChange = async (e) => {
        const selectedGenre = e.target.value;
        setGenre(selectedGenre)
        console.log("---genre---", selectedGenre)
        try {
            setIsLoading(true)
            const res = await getMoviesByGenre(selectedGenre);
            setMovies(res?.data || [])
        } catch (error) {
            console.error(error);
        }
        finally {
            setIsLoading(false)
        }
    }

    const handleTopRated = async () => {
        try {
            setIsLoading(true)
            const res = await getTopRatedMovies();
            setMovies(res?.data || []);

        } catch (error) {

        }
        finally {
            setIsLoading(false)
        }
    }
    if (isloading) return <div className="text-center mt-4">Loading movies...</div>;
    if (error) return <div className="alert alert-danger mt-4">{error}</div>;

    return (
        <div>
            <div >
                <div className="row mb-2 mt-2">
                    <div className="col-md-6 ">
                        <SearchBar search={search} setSearch={setSearch} style={{ "width": "100%" }} />
                    </div>
                    <div className="col-md-6">
                        <button className="btn btn-danger  me-2" onClick={handleTopRated}>
                            Top rated
                        </button>


                        <button className="btn btn-danger me-2" onClick={handleLatest}>
                            Latest
                        </button>


                        <select className="form-select-sm" name="genre" value={genre} onChange={handleGenreChange}>
                            <option value={""} >Select genre</option>
                            <option value={"Drama"}>Drama</option>
                            <option value={"Horror"}>Horror</option>
                            <option value={"Comedy"}>Comedy</option>
                            <option value={"Sci-Fi"}>Sci-Fi</option>
                            <option value={"Romance"}>Romance</option>
                            <option value={"Action"}>Action</option>
                            <option value={"Teen"}>Teen</option>
                        </select>
                    </div>
                </div>
                {search ? (
                    <CardList search={search} />
                ) : (
                    <div>
                        <div className="row">
                            {movies.map((movie) => (
                                <div key={movie._id} className="col-md-6 col-lg-4 mb-4">
                                    <MovieCard
                                        movie={movie}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}