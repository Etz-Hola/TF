import React from 'react';
import TrainCard from './TrainCard';

const TrainSearchResults = ({ trains, selectedDate }) => {
  return (
    <div className=" justify-between  ">
      <div className="w-1/2 pr-4">
          <h2 className="font-bold text-xl border-b mb-4"> {selectedDate && <span className="font-bold">{selectedDate}</span>}</h2>

        {trains && trains.length > 0 ? (
          trains.map((train, index) => (
            <TrainCard key={index} train={train} />
          ))
        ) : (
          <p>No outbound trains available.</p> 
        )}
      </div>
      <div className="w-1/2 pl-4">
      {/* <h2 className="font-bold text-xl border-b mb-4"> Return ⏪ {selectedDate && <span className="font-bold">{selectedDate}</span>}</h2> */}

        {/* <h3 className="font-bold text-xl border-b mb-4">Return ⏪</h3> */}
        {/* No return trains available */}
      </div>
    </div>
  );
};

export default TrainSearchResults;
