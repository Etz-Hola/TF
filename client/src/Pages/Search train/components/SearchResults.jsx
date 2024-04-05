import React from 'react';
import TrainCard from './TrainCard';

const SearchResults = ({ trains }) => {
  return (
    <div className="search-results">
      {trains.map((train, index) => (
        <TrainCard key={index} train={train} />
      ))}
    </div>
  );
};

export default SearchResults;
