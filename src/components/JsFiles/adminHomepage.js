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
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const handleUserProfile = () => {
    navigate("/crud");
  };

  const isAuthenticated = sessionStorage.getItem("username") !== null;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    } else {
      fetchMovies();
    }
  }, [isAuthenticated, navigate]);

  const fetchMovies = () => {
    fetch("http://localhost:8000/movies")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setMovies(data))
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  };

  useEffect(() => {
    if (selectedMovie) {
      setMovieTitle(formatTitle(selectedMovie.title));
      setMovieLanguage(formatLanguage(selectedMovie.language));
      setMovieImage(selectedMovie.image);
    } else {
      setMovieTitle("");
      setMovieLanguage("");
      setMovieImage("");
    }
  }, [selectedMovie]);

  const formatTitle = (title) => {
    return title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
  };

  const formatLanguage = (language) => {
    return language.charAt(0).toUpperCase() + language.slice(1).toLowerCase();
  };

  const handleSaveMovie = (method) => {
    const movieData = {
      title: formatTitle(movieTitle),
      language: formatLanguage(movieLanguage),
      image: movieImage,
    };

    const url = selectedMovie
      ? `http://localhost:8000/movies/${selectedMovie.id}`
      : "http://localhost:8000/movies";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((savedMovie) => {
        if (selectedMovie) {
          setMovies((prevMovies) =>
            prevMovies.map((movie) =>
              movie.id === savedMovie.id ? savedMovie : movie
            )
          );
          setSelectedMovie(null);
        } else {
          setMovies([...movies, savedMovie]);
        }
        setMovieTitle("");
        setMovieLanguage("");
        setMovieImage("");
      })
      .catch((error) => {
        console.error("Error saving movie:", error);
      });
  };

  const handleDeleteMovie = (movieId) => {
    fetch(`http://localhost:8000/movies/${movieId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setMovies((prevMovies) =>
          prevMovies.filter((movie) => movie.id !== movieId)
        );
        setSelectedMovie(null);
        setMovieTitle("");
        setMovieLanguage("");
        setMovieImage("");
      })
      .catch((error) => {
        console.error("Error deleting movie:", error);
      });
  };

  const handleCancel = () => {
    setSelectedMovie(null);
    setMovieTitle("");
    setMovieLanguage("");
    setMovieImage("");
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="container-fluid mt-0 flex-grow-1">
        <div className="row">
          <div className="col-lg-12">
            <nav className="navbar navbar-expand-lg navbar-primary bg-primary">
              <div className="container-fluid">
                <span className="navbar-brand mx-auto text-white">
                  Admin Homepage
                </span>
                <div className="d-flex">
                  <button
                    className="btn btn-outline-success text-white me-2"
                    onClick={handleUserProfile}
                  >
                    User Profile
                  </button>
                  <button
                    className="btn btn-outline-danger text-white"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </nav>
            <div className="col-sm-6">
              <div className="mb-1">
                <label className="form-label">Movie Title:</label>
                <input
                  className="form-control form-control-sm"
                  type="text"
                  value={movieTitle}
                  onChange={(e) => setMovieTitle(e.target.value)}
                />
              </div>
              <div className="mb-1">
                <label className="form-label">Movie Language:</label>
                <input
                  className="form-control form-control-sm"
                  type="text"
                  value={movieLanguage}
                  onChange={(e) => setMovieLanguage(e.target.value)}
                />
              </div>
              <div className="mb-1">
                <label className="form-label">Movie URL</label>
                <input
                  className="form-control form-control-sm"
                  type="text"
                  value={movieImage}
                  onChange={(e) => setMovieImage(e.target.value)}
                />
                {selectedMovie ? (
                  <div>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleSaveMovie("PUT")}
                    >
                      Update Movie
                    </button>
                    <button
                      className="btn btn-secondary ml-2"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleSaveMovie("POST")}
                    >
                      Add Movie
                    </button>
                    <button
                      className="btn btn-secondary ml-2"
                      onClick={handleCancel}
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-12">
              <div className="mt-4">
                <h2>Movies List:</h2>
                <div className="d-flex flex-wrap">
                  {movies.map((movie) => (
                    <div key={movie.id} className="m-2">
                      <img
                        src={movie.image}
                        alt={movie.title}
                        style={{ width: "200px", height: "200px" }}
                      />
                      <p>Title: {formatTitle(movie.title)}</p>
                      <p>Language: {formatLanguage(movie.language)}</p>
                      <button
                        className="btn btn-secondary"
                        onClick={() => setSelectedMovie(movie)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteMovie(movie.id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer bg-primary text-white text-center py-2">
        <p>@2023_Hexaware Technologies Private Limited</p>
      </footer>
    </div>
  );
}

export default AdminHomepage;
