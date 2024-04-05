// SearchResults.js
import React from 'react';

const SearchResults = ({ trains }) => {
  return (
    <div className="bg-pic">
      <table className="styled-table">
        <thead>
          <tr>
            <th>Train Name/Number</th>
            <th>Departure Station</th>
            <th>Arrival Station</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Duration</th>
            <th>Available Seats</th>
          </tr>
        </thead>
        <tbody>
          {trains.map((train, index) => (
            <tr key={index}>
              <td>{train.nameOrNumber}</td>
              <td>{train.departureStation}</td>
              <td>{train.arrivalStation}</td>
              <td>{train.departureTime}</td>
              <td>{train.arrivalTime}</td>
              <td>{train.duration}</td>
              <td>{train.availableSeats}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchResults;
