import React, { useState } from 'react';
import '../styling/DateSelection.css';

function DateSelection({ onClose, onDateSelect }) {
  const [selectedDate, setSelectedDate] = useState('');
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 6);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleConfirm = () => {
    if (selectedDate) {
      onDateSelect(new Date(selectedDate));
      onClose();
    } else {
      alert('Please select a date.');
    }
  };

  return (
    <div className="date-selection-modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>Select a Date</h2>
        <div className="date-picker">
         
          <input
            type="date"
            id="selectedDate"
            value={selectedDate}
            onChange={handleDateChange}
            min={minDate.toISOString().split('T')[0]}
            max={maxDate.toISOString().split('T')[0]}
          />
        </div>
        <button className="confirm-button" onClick={handleConfirm}>Confirm</button>
      </div>
    </div>
  );
}

export default DateSelection;
