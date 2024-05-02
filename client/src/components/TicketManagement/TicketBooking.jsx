// Import Axios and useAxiosInstance hook
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { useAxiosInstance } from '/api/axios'; // Import useAxiosInstance hook

const TicketBooking = ({ trainId }) => {
  const axiosInstance = useAxiosInstance(); // Initialize Axios instance

  const [seatType, setSeatType] = useState('standard');
  const [numberOfSeats, setNumberOfSeats] = useState(1);

  const handleBookTicket = async () => {
    try {
      // Send a POST request to book a ticket
      const response = await axiosInstance.post('/tickets/book', {
        trainId: trainId,
        seatType: seatType,
        numberOfSeats: numberOfSeats,
      });

      // Handle success response
      console.log('Ticket booked successfully:', response.data);
      // Add further actions as needed (e.g., show a success message)
    } catch (error) {
      // Handle error
      console.error('Error booking ticket:', error);
      // Add further error handling (e.g., show an error message)
    }
  };

  return (
    <div>
      <h2>Ticket Booking</h2>
      <div>
        <label>
          Seat Type:
          <select value={seatType} onChange={(e) => setSeatType(e.target.value)}>
            <option value="standard">Standard</option>
            <option value="firstclass">First Class</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Number of Seats:
          <input
            type="number"
            value={numberOfSeats}
            onChange={(e) => setNumberOfSeats(parseInt(e.target.value))}
          />
        </label>
      </div>
      <button onClick={handleBookTicket}>Book Ticket</button>
    </div>
  );
};

export default TicketBooking;
