import React, { useState, useEffect } from 'react';
import { useAxiosInstance } from '/api/axios'; // Import Axios instance

const TrainCard = ({ train }) => {
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [seatCount, setSeatCount] = useState(1);
  const [selectedTicketClass, setSelectedTicketClass] = useState(null);
  const [loading, setLoading] = useState(false);
    const axiosInstance = useAxiosInstance();


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/api/trains/${train._id}/price/${selectedTicketClass}`);
        setSelectedPrice(response.data.price);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching ticket price:', error);
        setLoading(false);
      }
    };

    if (selectedTicketClass) {
      fetchData();
    }
  }, [selectedTicketClass, train._id]);

  const handleSeatCountChange = (e) => {
    setSeatCount(parseInt(e.target.value));
  };

  const handlePriceChange = (event) => {
    setSelectedTicketClass(event.target.id);
  };

  const totalPrice = selectedPrice ? parseFloat(selectedPrice) * seatCount : 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between mb-4">
        <div className="font-bold">
          <span>Departure Time:</span>
          <span className="ml-2">{train.departureTime}</span>
        </div>
        <div className="font-bold">
          <span>Arrival Time:</span>
          <span className="ml-2">{train.arrivalTime}</span>
        </div>
      </div>
      <div className="flex justify-between mb-4">
        <div className="font-semibold">
          <span>Departure Station:</span>
          <span className="ml-2">{train.departureStation}</span>
        </div>
        <div className="font-semibold">
          <span>Arrival Station:</span>
          <span className="ml-2">{train.arrivalStation}</span>
        </div>
      </div>
      <div className="flex justify-between mb-4">
        <div>
          <span className="font-semibold">Duration:</span>
          <span className="ml-2">{train.duration} minutes</span>
        </div>
        <div>
          <span className="font-semibold">Direct:</span>
          <span className="ml-2">{train.direct ? 'Yes' : 'No'}</span>
        </div>
      </div>
      <div className="flex justify-between mb-4">
        <div>
          <input 
            type="checkbox" 
            id="standard" 
            checked={selectedTicketClass === 'standard'} 
            onChange={handlePriceChange} 
            className="form-checkbox h-5 w-5 text-blue-500" 
            required
          />
          <label htmlFor="standard" className="ml-2">Standard (${train.standardPrice})</label>
        </div>
        <div>
          <input 
            type="checkbox" 
            id="firstClass" 
            checked={selectedTicketClass === 'firstClass'} 
            onChange={handlePriceChange} 
            className="form-checkbox h-5 w-5 text-blue-500" 
            required
          />
          <label htmlFor="firstClass" className="ml-2">1st Class (${train.firstClassPrice})</label>
        </div>
      </div>
      <div className="flex justify-between mb-4">
        <label htmlFor="seatCount">Number of Seats:</label>
        <input 
          type="number" 
          id="seatCount" 
          value={seatCount} 
          onChange={handleSeatCountChange} 
          min="1" 
          max="10" 
          required
        />
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {loading ? 'Loading...' : `Book Your ${selectedTicketClass ? `${selectedTicketClass === 'standard' ? 'Standard' : '1st Class'} Ticket(s) for ${seatCount} seat(s) ($${totalPrice})` : "Ticket"}`}
      </button>
    </div>
  );
};

export default TrainCard;
