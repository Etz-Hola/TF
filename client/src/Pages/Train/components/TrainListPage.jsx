import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import { useAxiosInstance } from '/api/axios'; // Import Axios instance

const TrainListPage = () => {
  const [trainData, setTrainData] = useState([]);
  const axiosInstance = useAxiosInstance(); // Initialize Axios instance

  useEffect(() => {
    fetchTrainData();
  }, []);

  const fetchTrainData = async () => {
    try {
      const response = await axiosInstance.get('/trains/all-trains/get'); // Adjust the API endpoint
      console.log(response);
      if (response.status !== 200) { // Check for status code
        throw new Error('Failed to fetch data');
      }
      const data = response.data; // Access data from the response
      setTrainData(data);
    } catch (error) {
      console.error('Error fetching train data:', error);  
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Train List</h2>
      <DataTable data={trainData} />
    </div>
  );
};

export default TrainListPage;
