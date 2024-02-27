import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from './Profile';
import Login from '../JsFiles/login.js';
import Register from '../JsFiles/register.js';
import DateSelection from './DateSelection';
import SkeletonLoader from "../JsFiles/SkeletonLoader.js";
import '../styling/userHomepage.css';

function UserHomepage() {
    const [movies, setMovies] = useState([]);
    const [isProfileVisible, setIsProfileVisible] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showDateSelection, setShowDateSelection] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showRegisterModal, setShowRegisterModal] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const username = sessionStorage.getItem('username');
    const isUserLoggedIn = !!username;



    useEffect(() => {
        fetch('http://localhost:8000/movies')
            .then((response) => response.json())
            .then((data) => {
                setMovies(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching movies:', error);
            });
    }, []);

    const handleBook = (date) => {
        if (isUserLoggedIn) {
            setSelectedDate(date);
            setShowDateSelection(true);
        } else {
            setShowLoginModal(true);
            alert('Please login to book a movie.');
        }
    };

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
        window.location.reload();
    };


    const handleDateSelect = (date) => {
        setSelectedDate(date);
        // Redirect to the BookNow component with the selected date
        navigate('/book', { state: { selectedDate: date } });
    };

    // const closeRegisterForm = () => {
    //     setShowRegisterModal(false);
    //     navigate("/");
    // };
    const handleRegister = () => {
        setShowLoginModal(false);
        setShowRegisterModal(true);
    };

    // const closeRegisterModal = () => {
    //     setShowRegisterModal(false);
    //     navigate("/");
    // };


    return (
        <div className={`d-flex flex-column min-vh-100 ${isProfileVisible ? 'profile-visible' : ''} `}>

            <nav className="navbar navbar-expand-lg navbar-light bg-primary">
                <div className="container-fluid">
                    <span className="navbar-brand mx-auto text-white">Homepage</span>
                    {username ? (
                        <>
                            <button className={`btn btn-outline-success text-white profile-button ${isProfileVisible ? 'profile-active' : ''}`} onClick={() => setIsProfileVisible(true)}>
                                Profile
                            </button>
                            <button className="btn btn-outline-danger text-white" onClick={handleLogout}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button className={`btn btn-outline-success text-white`} onClick={() => setShowLoginModal(true)}>
                                Login
                            </button>
                        </>
                    )}
                </div>
            </nav>

            <div className="container mt-5">
                <div className={`row ${isProfileVisible ? 'profile-hidden' : ''}`}>
                    {isLoading ? (
                        // Render skeleton loaders while movies are loading
                        Array.from({ length: 8 }).map((_, index) => (
                            <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                                <SkeletonLoader />
                            </div>
                        ))
                    )

                        : (
                            movies.map((movie, index) => (
                                <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                                    <div className="card">
                                        <img src={movie.image} alt={movie.title} className="card-img-top" style={{ width: '100%', height: '200px' }} />
                                        <div className="card-body">
                                            <h5 className="card-title">{movie.title}</h5>
                                            <p className="card-text">Language: {movie.language}</p>
                                            <button className="btn btn-primary" onClick={() => handleBook(movie.date)}>Book Now</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                </div>
            </div>

            <div className={`profile-container ${isProfileVisible ? 'visible' : ''}`}>
                <div className="profile-wrapper">
                    <Profile onClose={() => setIsProfileVisible(false)} />
                </div>
            </div>

            <footer className="footer bg-primary text-white text-center py-0 mt-auto">
                <p>@2023_Hexaware Technologies Private Limited</p>
            </footer>

            {showLoginModal && (
                <div>
                    <Login onLogin={() => setShowLoginModal(false)}
                        closeModal={() => setShowLoginModal(false)}
                        onRegisterClick={handleRegister}
                    />
                </div>
            )}

            {showRegisterModal && (
                <div>
                    {/* <Register closeRegister={closeRegisterModal} /> */}
                    <Register onRegister={() => setShowRegisterModal(false)}
                        closeRegister={() => setShowRegisterModal(false)}


                    />


                </div>
            )}

            {showDateSelection && <DateSelection onClose={() => setShowDateSelection(false)} onDateSelect={handleDateSelect} />}
        </div>
    );
}

export default UserHomepage;
