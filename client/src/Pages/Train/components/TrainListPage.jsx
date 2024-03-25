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

  const handleEdit = (index) => {
    // Implement function to make row editable
    // For example, you can set a flag in the data to indicate it's editable
    const newData = [...trainData];
    newData[index].editable = true;
    setTrainData(newData);
  };

  const handleSave = async (index) => {
    // Implement function to save edited data to backend
    // For example, you can send a PUT request to update the data
    try {
      const response = await axiosInstance.put(`/trains/${trainData[index]._id}`, trainData[index]); // Adjust the API endpoint
      console.log(response);
      if (response.status === 200) { // Check for status code
        // Data successfully updated
        const newData = [...trainData];
        newData[index].editable = false; // Reset editable flag
        setTrainData(newData);
      } else {
        throw new Error('Failed to update data');
      }
    } catch (error) {
      console.error('Error updating train data:', error);  
    }
  };



  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Train List</h2>
      <DataTable data={trainData} onEdit={handleEdit} onSave={handleSave} />
    </div>
  );
};

export default TrainListPage;
