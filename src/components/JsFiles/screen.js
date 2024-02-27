import React, { useState, useEffect } from 'react';
import '../styling/screen.css';
import { useLocation } from 'react-router-dom';

const Screen = () => {
  const numRows = 10;
  const numColumns = 15;

  // Define seat prices based on rows
  const seatPrices = Array(numRows).fill(0).map((_, rowIndex) => {
    if (rowIndex >= 6 && rowIndex <= 9) {
      // Rows G to J
      return 150;
    } else {
      // Rows A to F
      return 200;
    }
  });

  const initialSeats = Array(numRows)
    .fill(0)
    .map(() => Array(numColumns).fill(false));

  const [seats, setSeats] = useState(initialSeats);
  const [selectedSeats, setSelectedSeats] = useState([0]);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [selectedTheater, setSelectedTheater] = useState('');
  const [selectedTiming, setSelectedTiming] = useState('');

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    setSelectedTheater(searchParams.get('theater'));
    setSelectedTiming(searchParams.get('timing'));

    // Extract and parse the seats query parameter
    const seatsParam = searchParams.get('seats');
    if (seatsParam) {
      const selectedSeatsArray = seatsParam.split(',');
      setSelectedSeats(selectedSeatsArray.map((seat) => {
        const [row, col] = seat.split('-').map(Number);
        return { row, col };
      }));
    }
  }, []);

  const toggleSeat = (row, col) => {
    if (paymentCompleted) {
      return; // Prevent seat selection after payment
    }

    if ((selectedSeats.length-1>5)){
      alert("select only 6 seats");
      return;
    }

    const newSeats = [...seats];

    newSeats[row][col] = !newSeats[row][col];
    setSeats(newSeats);

    const seat = { row, col };
    setSelectedSeats((prevSelectedSeats) => {
      const seatIndex = prevSelectedSeats.findIndex(
        (selectedSeat) => selectedSeat.row === row && selectedSeat.col === col
      );

      if (seatIndex === -1) {
        return [...prevSelectedSeats, seat];
      } else {
        const updatedSelectedSeats = [...prevSelectedSeats];
        updatedSelectedSeats.splice(seatIndex, 1);
        return updatedSelectedSeats;
      }
    });
  };

  const calculateTotalCost = () => {
    const cost = selectedSeats.reduce((totalCost, seat) => {
      return totalCost + seatPrices[seat.row];
    }, 0);
    return cost;
  };

  const handlePayNow = () => {
    const cost = calculateTotalCost();
    setPaymentCompleted(true); // Payment completed, disable further seat selection
    return cost;
  };

  const getSeatLabel = (row, col) => {
    const rowLabel = String.fromCharCode(65 + row);
    const colLabel = col + 1;
    return `${rowLabel}${colLabel}`;
  };

  return (
    <div className="screen-container">
      <div className="left-side">
        <h2>Selected Theater: {selectedTheater}</h2>
        <h2>Selected Timing: {selectedTiming}</h2>
        <h2>Total Selected Seats: {selectedSeats.length-1}</h2>
        {paymentCompleted && (
          <div className="total-cost">
            Total Cost: <span className="cost-value">₹{calculateTotalCost()-200}</span>
          </div>
        )}

      </div>

      <div><label>Rs.200</label></div>
      <div className="seats">
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            {row.map((isSeatAvailable, colIndex) => {
              const isSeatSelected = selectedSeats.some(
                (seat) => seat.row === rowIndex && seat.col === colIndex
              );

              return (
                <div
                  key={colIndex}
                  className={`seat ${isSeatAvailable ? (isSeatSelected ? 'selected' : 'available') : 'booked'}`}
                  onClick={() => {
                    if (!isSeatAvailable) {
                      toggleSeat(rowIndex, colIndex);
                    } else if (isSeatSelected) {
                      // If the seat is available and already selected, deselect it
                      toggleSeat(rowIndex, colIndex);
                    }
                  }}
                >
                  <span className="seat-label">{getSeatLabel(rowIndex, colIndex)}</span>
                </div>
                
              );
            })}
          </div>
        ))}
          <div><label>Rs.150</label></div>

      </div>
      <div className="screen">Screen</div>
      <div className="pay-now">
        <button onClick={handlePayNow}>Pay Now</button>
      </div>
    </div>
  );
};

export default Screen;
