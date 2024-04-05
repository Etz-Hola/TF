import React from 'react';

const SearchForm = ({ departureStations, arrivalStations, selectedDate, onSearch }) => {
  const [departureStation, setDepartureStation] = React.useState('');
  const [arrivalStation, setArrivalStation] = React.useState('');

  const handleSearch = () => {
    onSearch(departureStation, arrivalStation, selectedDate);
  };

  const handleFetchAllTrains = () => {
    // Call onSearch function with empty departure and arrival stations
    onSearch('', '', selectedDate);
  };

  return (
    <div className="flex justify-center items-center mb-4">
      <select
        value={departureStation}
        onChange={(e) => setDepartureStation(e.target.value)}
        className="border rounded mr-2 p-2"
      >
        <option value="">Departure Station</option>
        {departureStations.map((station, index) => (
          <option key={index} value={station}>{station}</option>
        ))}
      </select>

      <select
        value={arrivalStation}
        onChange={(e) => setArrivalStation(e.target.value)}
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
        onChange={(e) => setSelectedDate(e.target.value)}
        className="border rounded p-2"
      />

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        onClick={handleSearch}
      >
        Search
      </button>

      <button
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleFetchAllTrains}
      >
        Fetch All Trains
      </button>
    </div>
  );
};

export default SearchForm;
