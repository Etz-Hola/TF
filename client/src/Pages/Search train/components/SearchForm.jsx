// SearchForm.js
import React from 'react';

const SearchForm = ({ departureStations, arrivalStations, departureStation, arrivalStation, selectedDate, handleDepartureChange, handleArrivalChange, handleDateChange, handleSearch }) => {
  return (
    <div className="flex justify-center items-center mb-4">
      <select
        value={departureStation}
        onChange={handleDepartureChange}
        className="border rounded mr-2 p-2"
      >
        <option value="">Departure Station</option>
        {departureStations.map((station, index) => (
          <option key={index} value={station}>{station}</option>
        ))}
      </select>

      <select
        value={arrivalStation}
        onChange={handleArrivalChange}
        className="border rounded mr-2 p-2"
      >
        <option value="">Arrival Station</option>
        {arrivalStations.map((station, index) => (
          <option key={index} value={station}>{station}</option>
        ))}
      </select>

      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        className="border rounded p-2"
      />

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchForm;





