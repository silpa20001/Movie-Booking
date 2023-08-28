

// import React, { useState, useEffect } from "react";

// function AdminHomepage() {
//     const [movieTitle, setMovieTitle] = useState("");
//     const [movieLanguage, setMovieLanguage] = useState("");
//     const [movieImage, setMovieImage] = useState("");
   
    
//     const [movies, setMovies] = useState([]);

//     useEffect(() => {
//         // Fetch movies from JSON server
//         fetch("http://localhost:8000/movies")
//             .then(response => response.json())
//             .then(data => setMovies(data))
//             .catch(error => {
//                 console.error("Error fetching movies:", error);
//             });
//     }, []);




//     const handleAddMovie = () => {

//         const newMovie = {
//             title: movieTitle,
//             language: movieLanguage,
//             image: movieImage
//         };

//         // Send a POST request to JSON server
//         fetch("http://localhost:8000/movies", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(newMovie)
//         })
//         .then(response => response.json())
//         .then(savedMovie => {
//             // Update local state with the saved movie
//             setMovies(prevMovies => [...prevMovies, savedMovie]);
//             setMovieTitle("");
//             setMovieLanguage("");
//             setMovieImage("");
//         })
//         .catch(error => {
//             console.error("Error adding movie:", error);
//         });
//     };

//     return (
//         <div>
//             <h1>Admin Homepage</h1>
//             <div>
//                 <label>Movie Title:</label>
//                 <input
//                     type="text"
//                     value={movieTitle}
//                     onChange={(e) => setMovieTitle(e.target.value)}
//                 />
//             </div>
//             <div>
//                 <label>Movie Language:</label>
//                 <input
//                     type="text"
//                     value={movieLanguage}
//                     onChange={(e) => setMovieLanguage(e.target.value)}
//                 />
//             </div>
//             <div>
//                 <label>Movie Image URL:</label>
//                 <input
//                     type="text"
//                     value={movieImage}
//                     onChange={(e) => setMovieImage(e.target.value)}
//                 />
//             </div>
//             <button onClick={handleAddMovie}>Add Movie</button>

//             <div>
//                 <h2>Added Movies:</h2>
//                 <ul>
//                     {movies.map((movie, index) => (
//                         <li key={index}>
//                             <img src={movie.image} alt={movie.title} />
//                             <p>Title: {movie.title}</p>
//                             <p>Language: {movie.language}</p>
//                             <button>Book Now</button>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// }

// export default AdminHomepage;

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function AdminHomepage() {
    const [movieTitle, setMovieTitle] = useState("");
    const [movieLanguage, setMovieLanguage] = useState("");
    const [movieImage, setMovieImage] = useState("");
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/");
    };

    useEffect(() => {
        // Fetch movies from JSON server
        fetch("http://localhost:8000/movies")
            .then(response => response.json())
            .then(data => setMovies(data))
            .catch(error => {
                console.error("Error fetching movies:", error);
            });
    }, []);

    const handleAddMovie = () => {
        const newMovie = {
            title: movieTitle,
            language: movieLanguage,
            image: movieImage,
        };

        // Send a POST request to JSON server
        fetch("http://localhost:8000/movies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newMovie),
        })
            .then(response => response.json())
            .then(savedMovie => {
                // Update local state with the saved movie
                setMovies(prevMovies => [...prevMovies, savedMovie]);
                setMovieTitle("");
                setMovieLanguage("");
                setMovieImage("");
            })
            .catch(error => {
                console.error("Error adding movie:", error);
            });
    };

    const handleEditMovie = movie => {
        setSelectedMovie(movie);
        setMovieTitle(movie.title);
        setMovieLanguage(movie.language);
        setMovieImage(movie.image);
    };

    const handleUpdateMovie = () => {
        const updatedMovie = {
            title: movieTitle,
            language: movieLanguage,
            image: movieImage,
        };

        // Send a PUT request to update the movie on JSON server
        fetch(`http://localhost:8000/movies/${selectedMovie.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedMovie),
        })
            .then(response => response.json())
            .then(updatedMovie => {
                // Update local state with the updated movie
                setMovies(prevMovies =>
                    prevMovies.map(movie =>
                        movie.id === updatedMovie.id ? updatedMovie : movie
                    )
                );
                setSelectedMovie(null);
                setMovieTitle("");
                setMovieLanguage("");
                setMovieImage("");
            })
            .catch(error => {
                console.error("Error updating movie:", error);
            });
    };

    const handleDeleteMovie = movieId => {
        // Send a DELETE request to remove the movie from JSON server
        fetch(`http://localhost:8000/movies/${movieId}`, {
            method: "DELETE",
        })
            .then(() => {
                // Update local state by filtering out the deleted movie
                setMovies(prevMovies => prevMovies.filter(movie => movie.id !== movieId));
            })
            .catch(error => {
                console.error("Error deleting movie:", error);
            });
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-6">
                    <button onClick={handleLogout}>Logout</button>
                    <h1 className="mb-4">Admin Homepage</h1>

                    <div className="mb-3">
                        <label className="form-label">Movie Title:</label>
                        <input
                            className="form-control"
                            type="text"
                            value={movieTitle}
                            onChange={e => setMovieTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Movie Language:</label>
                        <input
                            className="form-control"
                            type="text"
                            value={movieLanguage}
                            onChange={e => setMovieLanguage(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Movie Image URL:</label>
                        <input
                            className="form-control"
                            type="text"
                            value={movieImage}
                            onChange={e => setMovieImage(e.target.value)}
                        />
                    </div>
                    {selectedMovie ? (
                        <button className="btn btn-primary" onClick={handleUpdateMovie}>
                            Update Movie
                        </button>
                    ) : (
                        <button className="btn btn-primary" onClick={handleAddMovie}>
                            Add Movie
                        </button>
                    )}
                </div>
                <div className="col-lg-6">
                    <div className="mt-4">
                        <h2>Added Movies:</h2>
                        <ul className="list-group">
                            {movies.map(movie => (
                                <li key={movie.id} className="list-group-item">
                                    <img src={movie.image} alt={movie.title} />
                                    <p>Title: {movie.title}</p>
                                    <p>Language: {movie.language}</p>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => handleEditMovie(movie)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDeleteMovie(movie.id)}
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminHomepage;
