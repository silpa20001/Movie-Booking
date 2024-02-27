// Seats.js
import React, { useState } from 'react';
import '../styling/seats.css';
import { useNavigate } from 'react-router-dom';

function Seats({ closeModal, selectedTheater, selectedTime }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();

  const handleSeatClick = (seatNumber) => {
    // Toggle seat selection
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handleSelectSeatsClick = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat.');
      return;
    }

    // Calculate total ticket price (200 per seat)
    const totalPrice = selectedSeats.length * 200;

    // Redirect to the screen component with selected theater, selected time, and selected seats
    navigate(`/screen?theater=${selectedTheater}&timing=${selectedTime}&seats=${selectedSeats.join(',')}`);
  };

  return (
    <div className="seats-modal">
      <div className="container seats-container text-center my-6">
        <h2>How many seats?</h2>
        <button className="close-btn" onClick={closeModal}>
          &#10006;
        </button>
        <div className="seat-numbers">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div
              key={num}
              className={`seat-circle ${selectedSeats.includes(num) ? 'selected' : ''}`}
              onClick={() => handleSeatClick(num)}
            >
              {num}
            </div>
          ))}
        </div>
        <p className="ticket-price">Ticket Price: 200 per seat</p>
        <p className="availability-text">Available</p>
        <button className="btn btn-success select-seats-button" onClick={handleSelectSeatsClick}>
          Select Seats
        </button>
      </div>
    </div>
  );
}

export default Seats;
