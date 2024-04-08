import React, { useState } from 'react';

const TrainCard = ({ train }) => {
  const [selectedPrice, setSelectedPrice] = useState(null);

  const handlePriceChange = (event) => {
    setSelectedPrice(event.target.value);
  };

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
            value="standard" 
            checked={selectedPrice === 'standard'} 
            onChange={handlePriceChange} 
            required
          />
          <label htmlFor="standard" className="ml-2">Standard</label>
        </div>
        <div>
          <input 
            type="checkbox" 
            id="firstClass" 
            value="firstClass" 
            checked={selectedPrice === 'firstClass'} 
            onChange={handlePriceChange} 
            required
          />
          <label htmlFor="firstClass" className="ml-2">1st Class</label>
        </div>
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Book Your Ticket
      </button>
    </div>
  );
};

export default TrainCard;
