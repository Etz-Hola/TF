import React, { useState, useEffect } from 'react';
import { useAxiosInstance } from '/api/axios'; // Import Axios instance
import useShowToast from '../../../hooks/useShowToast'; // Import useShowToast hook

const SearchTrain = () => {
  const [departureStation, setDepartureStation] = useState('');
  const [departureStations, setDepartureStations] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [arrivalStation, setArrivalStation] = useState('');
  const [arrivalStations, setArrivalStations] = useState([]);
  const [stations, setStations] = useState([]); // State to hold the list of stations
  const [searchResults, setSearchResults] = useState([]); // State to hold the search results
  const axiosInstance = useAxiosInstance(); // Initialize Axios instance
  const showToast = useShowToast(); // Initialize useShowToast hook

  // Fetch the list of stations when the component mounts
  useEffect(() => {
    fetchStations();
  }, []);

  useEffect(() => {
    if (departureStation) {
      const filtered = stations.arrivalStations.filter(el => el.toLowerCase() !== departureStation.toLowerCase())
      setArrivalStations(filtered)
    } 
    //   const filtered = stations.departureStations.filter(el => el.toLowerCase() !== arrivalStation.toLowerCase())
    // else if (arrivalStation) {
    //   setDepartureStations(filtered)
    // }
  }, [departureStation, arrivalStation])


  // Function to fetch the list of stations from the backend
  const fetchStations = async () => {
    try {
      const response = await axiosInstance.get('/trains/get/search/station'); // Adjust the endpoint according to your backend API
      // Extract the list of stations from the response
      const stationsData = response.data;
      console.log(response.data)
      // const stationsList = stationsData.map(station => station.name);
      setStations(stationsData); // Set the list of stations in the state
      setArrivalStations(stationsData.arrivalStations)
      setDepartureStations(stationsData.departureStations)
    } catch (error) {
      console.error('Error fetching stations:', error);
      // If there's an error fetching stations, set stations to an empty array or handle it as appropriate
      setStations([]);
      // Show a toast with the error message
      showToast('Error fetching stations. Please try again later.', 'error');
    }
  };



  const handleSearch = async () => {
    try {
      // Send a GET request to the backend API with query parameters
      const response = await axiosInstance.get('/trains/get/search/station', {
        params: {
          departureStation: departureStation,
          arrivalStation: arrivalStation,
          selectedDate: selectedDate,
        },
      });

      // Update the search results state with the response data
      setSearchResults(response.data);

    } catch (error) {
      console.error('Error searching for trains:', error);
      // Show a toast with the error message
      showToast('Error searching for trains. Please try again later.', 'error');
    }
  };


  return (


    <div className="container mx-auto mt-8">
      <div className="h-24 flex justify-center items-center shadow">
        <p className="uppercase font-bold text-4xl text-center">
          Search Available Trains
        </p>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-1/3">
          {/* Departure station dropdown */}
          <select
            className="block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
            value={departureStation}
            onChange={(e) => setDepartureStation(e.target.value)}
          >
            {/* <option value="">Departure Station</option> */}
            {/* Map through the stations array to dynamically populate options */}
            {departureStations?.map((departureStation, index) => (
              <option key={index} value={departureStation}>{departureStation}</option>
            ))}
          </select>
        </div>
        <div className="mx-4"></div>
        <div className="w-1/3">
          {/* Arrival station dropdown */}
          <select
            className="block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
            value={arrivalStation}
            onChange={(e) => setArrivalStation(e.target.value)}
          >
            {/* <option value="">Arrival Station</option> */}
            {arrivalStations?.map((arrivalStation, index) => (
              <option key={index} value={arrivalStation}>{arrivalStation}</option>
            ))}
          </select>
        </div>
        <div className="mx-4"></div>
        <div className="w-1/3">
          {/* Date input */}
          <input
            type="date"
            className="block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-center mt-4">
        {/* Search button */}
        <button
          className="px-4 py-2 bg-indigo-500 text-white rounded-md shadow-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {/* Display search results */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Search Results</h2>
        <ul>
          {searchResults.map(result => (
            <li key={result.id}>{result.trainName}</li>
          ))}
        </ul>
      </div>
    </div>


  );
};

export default SearchTrain;
