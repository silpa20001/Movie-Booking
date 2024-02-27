import React, { useState } from 'react';
import '../styling/BookNow.css';
import Seats from '../JsFiles/seats'; // Assuming Seats component is in a separate file
import { useNavigate, useLocation } from 'react-router-dom';
import Profile from './Profile';

function BookNow() {
  const location = useLocation();
  const { selectedDate } = location.state || { selectedDate: null };

  const [selectedTheater, setSelectedTheater] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // To control the popup

  const navigate = useNavigate();

  const theaters = [
    {
      name: 'INOX Marina Mall',
      timings: ['09:00', '12:00', '15:00', '18:00'],
    },
    {
      name: 'Vivira Mall',
      timings: ['09:00', '12:00', '15:00', '18:00'],
    },
    {
      name: 'AGS Cinemas',
      timings: ['09:00', '12:00', '15:00', '18:00'],
    },
    {
      name: 'PVR Heritage',
      timings: ['09:00', '12:00', '15:00', '18:00'],
    },
  ];

  // Filter theaters based on the selected date
  const filteredTheaters = theaters.filter((theater) => {
    if (!selectedDate) return false; // If no date is selected, don't display any theaters

    const dayOfWeek = selectedDate.getDay(); // Get the day of the week (0 = Sunday, 1 = Monday, etc.)

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      // Display all 4 theaters on Sunday and Saturday
      return true;
    } else if (dayOfWeek === 1 || dayOfWeek === 5) {
      // Display 3 theaters on Monday and Friday
      return theaters.indexOf(theater) < 3;
    } else if (dayOfWeek === 2) {
      // Display 1 theater on Tuesday
      return theaters.indexOf(theater) === 0;
    } else if (dayOfWeek === 3 || dayOfWeek === 4) {
      // Display 2 theaters on Wednesday and Thursday
      return theaters.indexOf(theater) < 2;
    } else {
      // Display all theaters on other days
      return true;
    }
  });

  const handleTheaterChange = (theaterName) => {
    setSelectedTheater(theaterName);
    setSelectedTime('');
  };

  const handleTimeSlotClick = (theaterName, timing) => {
    if (!selectedDate) {
      alert('Please select a date.');
      return;
    }

    const currentDateTime = new Date();

    // Create a date object using selectedDate and timing
    const selectedDateTime = new Date(selectedDate);
    const [hour, minute] = timing.split(':').map(Number);
    selectedDateTime.setHours(hour, minute);

    if (selectedDateTime > currentDateTime) {
      setSelectedTheater(theaterName);
      setSelectedTime(timing);
      setShowPopup(true);
    } else {
      alert('Selected show time has passed.');
    }
  };

  const handleSeatsClose = () => {
    setShowPopup(false);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
    window.location.reload();
  };

  return (
    <div className={`d-flex flex-column min-vh-100 ${isProfileVisible ? 'profile-visible' : ''}`}>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <div className="container-fluid">
          <span className="navbar-brand mx-auto text-white">Homepage</span>
          <button
            className={`btn btn-outline-success text-white profile-button ${isProfileVisible ? 'profile-active' : ''}`}
            onClick={() => setIsProfileVisible(true)}
          >
            Profile
          </button>
          <button className="btn btn-outline-danger text-white" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
      <div className={`profile-container ${isProfileVisible ? 'visible' : ''}`}>
        <div className="profile-wrapper">
          <Profile onClose={() => setIsProfileVisible(false)} />
        </div>
      </div>

      <div className="container book-now-container text-center my-6">
        {selectedDate && (
          <div className="selected-date">
            <h3>Selected Date:</h3>
            <p>{selectedDate.toDateString()}</p>
          </div>
        )}

        <div className="theater-timings">
          {filteredTheaters.map((theater, index) => (
            <div key={index} className="theater">
              <h3>{theater.name}</h3>
              <div className="timings">
                {theater.timings.map((timing, i) => (
                  <button
                    key={i}
                    className={`btn btn-success timing-button with-gap`}
                    onClick={() => handleTimeSlotClick(theater.name, timing)}
                  >
                    {timing}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Show the Seats component as a popup */}
        {showPopup && (
          <div className="popup-container">
            <div className="popup">
              <span className="close-button" onClick={handleSeatsClose}>
                &times;
              </span>
              <Seats
                closeModal={handleSeatsClose}
                selectedTheater={selectedTheater}
                selectedTime={selectedTime}
              />
            </div>
          </div>
        )}
      </div>
      <footer className="footer bg-primary text-white text-center py-0 mt-auto">
        <p>@2023_Hexaware Technologies Private Limited</p>
      </footer>
    </div>
  );
}

export default BookNow;
