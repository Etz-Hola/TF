import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm';
import TrainCard from './TrainCard';
import TrainSearchResults from './TrainSearchResults';
import { useAxiosInstance } from '/api/axios'; // Import Axios instance
import useShowToast from '../../../hooks/useShowToast'; // Import useShowToast hook
import SidebarWithHeader from '../../../SidebarWithHeader';

const TrainSearchContainer = () => {
  const [trains, setTrains] = useState([]);
  const [departureStation, setDepartureStation] = useState('');
  const [arrivalStation, setArrivalStation] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [departureStations, setDepartureStations] = useState([]);
  const [arrivalStations, setArrivalStations] = useState([]);
  const [searchInitiated, setSearchInitiated] = useState(false); // State to track if search has been initiated
  const axiosInstance = useAxiosInstance();
  const showToast = useShowToast();

  useEffect(() => {
    fetchStations();
  }, []);

  useEffect(() => {
    if (departureStation) {
      const filtered = arrivalStations.filter(el => el.toLowerCase() !== departureStation.toLowerCase());
      setArrivalStations(filtered);
    }
  }, [departureStation]);

  const fetchStations = async () => {
    try {
      const response = await axiosInstance.get('/trains/get/search/station');
      const { departureStations, arrivalStations } = response.data;
      setDepartureStations(departureStations);
      setArrivalStations(arrivalStations);
    } catch (error) {
      console.error('Error fetching stations:', error);
      showToast('Error fetching stations. Please try again later.', 'error');
    }
  };

  const fetchTrains = async () => {
    try {
      const response = await axiosInstance.get('/trains/get/station', {
        params: {
          departureStation: departureStation,
          arrivalStation: arrivalStation,
          selectedDate: selectedDate,
        },
      });
      setTrains(response.data || []);

      // Check if response.data is not null or undefined before accessing its length
      if (response.data && response.data.length === 0) {
        showToast('No trains found for the selected criteria.', 'info');
      }
    } catch (error) {
      console.error('Error fetching trains:', error);
      showToast('Error fetching trains. Please try again later.', 'error');
    }
  };

  const handleDepartureChange = (e) => {
    setDepartureStation(e.target.value);
  };

  const handleArrivalChange = (e) => {
    setArrivalStation(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleSearch = () => {
    setSearchInitiated(true); // Update search initiation state to true
    fetchTrains();
  };

  return (
   <SidebarWithHeader>
     <div className="container mx-auto mt-8">
      <SearchForm
        departureStations={departureStations}
        arrivalStations={arrivalStations}
        departureStation={departureStation}
        arrivalStation={arrivalStation}
        selectedDate={selectedDate}
        handleDepartureChange={handleDepartureChange}
        handleArrivalChange={handleArrivalChange}
        handleDateChange={handleDateChange}
        handleSearch={handleSearch}
      /> 
      {searchInitiated && <TrainSearchResults trains={trains} />}
    </div>
   </SidebarWithHeader>
  );
};

export default TrainSearchContainer;
