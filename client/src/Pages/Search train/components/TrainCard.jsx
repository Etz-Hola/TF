import React, { useState, useEffect } from 'react';
import { useAxiosInstance } from '/api/axios'; // Import Axios instance
import { useNavigate } from 'react-router-dom';

const TrainCard = ({ train }) => {
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [seatCount, setSeatCount] = useState(1);
  const [selectedTicketClass, setSelectedTicketClass] = useState(null);
  const [loading, setLoading] = useState(false);
  const axiosInstance = useAxiosInstance();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/trains/${train._id}/price/${selectedTicketClass}`);
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
  }, [selectedTicketClass, train._id, axiosInstance]);

  const handleBookingPage = () => {
    navigate(`/trains/${train._id}/book`);
  };

  

 

  const totalPrice = selectedPrice ? parseFloat(selectedPrice) * seatCount : 0;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 ">
    {/* // <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6"> */}
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
      <div className="   justify-between mb-4">
        <div>
          <span className="font-semibold">1st Class Price: </span>
          <span className="ml-2">${train.firstClassPrice}</span>
        </div>
        <div>
          <span className="font-semibold">Standard Price:</span>
          <span className="ml-2">${train.standardPrice}</span>
        </div>
      </div>
      
      <button onClick={handleBookingPage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {loading ? 'Loading...' : `Book Your ${selectedTicketClass ? `${selectedTicketClass === 'standard' ? 'Standard' : '1st Class'} Ticket(s) for ${seatCount} seat(s) ($${totalPrice})` : "Ticket"}`}
      </button>
    </div>
  );
};

export default TrainCard;


