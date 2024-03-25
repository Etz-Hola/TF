import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import { useAxiosInstance } from '/api/axios'; // Import Axios instance
import { Progress } from '@material-tailwind/react'; // Import Progress component
import useShowToast from '../../../hooks/useShowToast'; // Import showToast hook from custom hook file
// import { PencilIcon, TrashIcon } from '@heroicons/react/solid'; // Import icons for editing and deleting

const TrainListPage = () => {
  const [trainData, setTrainData] = useState([]);
  const axiosInstance = useAxiosInstance(); // Initialize Axios instance
  const showToast = useShowToast(); // Initialize showToast hook
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchTrainData(); // Fetch data when component mounts
  }, []);

  const fetchTrainData = async () => {
    try {
      const response = await axiosInstance.get('/trains/all-trains/get');
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
    
    const newData = [...trainData];
    newData[index].editable = true;
    setTrainData(newData);
  };

  const handleSave = async (index) => {
    try {
      const response = await axiosInstance.put(`/trains/${trainData[index]._id}`, trainData[index]);
      if (response.status === 200) {
        const newData = [...trainData];
        newData[index].editable = false;
        setTrainData(newData);
      } else {
        throw new Error('Failed to update data');
      }
    } catch (error) {
      console.error('Error updating train data:', error);
    }
  };

  const handleDelete = async (train) => {
    try {
      const response = await axiosInstance.delete(`/trains/${train._id}`);
      if (response.status === 200) {
        const newData = trainData.filter(item => item._id !== train._id);
        setTrainData(newData);
      } else {
        throw new Error('Failed to delete data');
      }
    } catch (error) {
      console.error(error);
      showToast('Error', 'Something went wrong', 'error');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Train List</h2>
      <DataTable
        data={trainData}
        onEdit={handleEdit}
        onSave={handleSave}
        onDelete={handleDelete}
        setTrainData={setTrainData} // Pass setTrainData function to DataTable
      />
      {isUploading && <Progress value={uploadProgress} color="blue" />} {/* Render Progress component to track file upload progress */}
    </div>
  );
};

export default TrainListPage;
