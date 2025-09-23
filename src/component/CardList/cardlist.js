    import React, { useEffect, useState } from "react";
    import { getMovies } from "../../api/movies";
    import MovieCard from "../MovieCard/moviecard";

    export default function CardList({search}) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const res = await getMovies();
            setMovies(res.data);
        } catch (err) {
            console.error("Failed to load movies:", err);
        }
        };
        fetchData();
    }, []);

    
    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container my-5">
        
        <div className="row g-4">
            {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
                <div key={movie._id} className="col-md-4">
                <MovieCard movie={movie} />
                </div>
            ))
            ) : (
            <p className="text-center">No movies found.</p>
            )}
        </div>
        </div>
    );
    }
