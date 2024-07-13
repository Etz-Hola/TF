import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAxiosInstance } from '/api/axios'; // Import Axios instance

const TrainCards = () => {
    const [trains, setTrains] = useState([]);
    const axiosInstance = useAxiosInstance(); // Initialize Axios instance
    const navigate = useNavigate();

    useEffect(() => {
        fetchTrains();
    }, []);

    const fetchTrains = async () => {
        try {
            const response = await axiosInstance.get('/trains/get/station');
            setTrains(response.data);
        } catch (error) {
            console.error('Error fetching trains:', error);
        }
    };

    const handleDetailsClick = (trainId) => {
        navigate(`/train-details/${trainId}`);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-center mb-6">Available Trains</h2>

            {trains.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {trains.map(train => (
                        <div 
                            key={train._id} 
                            className="border border-gray-300 p-4 mb-4 rounded-lg shadow-lg flex flex-col justify-between h-full"
                        >
                            <div>
                                <h3 className="text-xl text-center font-bold">{train.nameOrNumber}</h3>
                                <p className="mt-2">Departure: {train.departureStation}</p>
                                <p className="mt-1">Arrival: {train.arrivalStation}</p>
                            </div>
                            <button 
                                className="mt-auto bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 self-end" 
                                onClick={() => handleDetailsClick(train._id)}
                            >
                                Get Full Details
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No trains available for the selected stations.</p>
            )}
        </div>
    );
};

export default TrainCards;
