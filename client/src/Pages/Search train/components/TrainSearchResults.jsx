import React from 'react';
import TrainCard from './TrainCard';

const TrainSearchResults = ({ trains }) => {
  return (
    <div className="search-results">
      {trains.map((train, index) => (
        <TrainCard key={index} train={train} />
      ))}
    </div>
  );
};

export default TrainSearchResults;






// import React from 'react';
// import TrainCard from './TrainCard';

// const SearchResults = ({ trains }) => {
//   return (
//     <div className="search-results">
//       {trains.map((train) => (
//         <TrainCard key={train.id} train={train} /> {/* Assuming train has a unique id */}
//       ))}
//     </div>
//   );
// };

// export default SearchResults;
