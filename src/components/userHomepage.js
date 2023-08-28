// import React, { useState, useEffect } from "react";

// function UserHomepage() {
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

//     return (
//         <div>
//             <h1>User Homepage</h1>
//             <div>
//                 <h2>Available Movies:</h2>
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

// export default UserHomepage;


import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function UserHomepage() {
    const [movies, setMovies] = useState([]);
    const navigate= useNavigate();


    const handleLogout = () =>{
        navigate("/");
    }

    useEffect(() => {
        // Fetch movies from JSON server
        fetch("http://localhost:8000/movies")
            .then(response => response.json())
            .then(data => setMovies(data))
            .catch(error => {
                console.error("Error fetching movies:", error);
            });
    }, []);

    return (
        <div className="container mt-5">
            <button onClick={handleLogout}>Logout</button>
            <h1 className="mb-4">User Homepage</h1>
            <div className="row">
                {movies.map((movie, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card">
                            <img src={movie.image} alt={movie.title} className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">{movie.title}</h5>
                                <p className="card-text">Language: {movie.language}</p>
                                <button className="btn btn-primary">Book Now</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserHomepage;
