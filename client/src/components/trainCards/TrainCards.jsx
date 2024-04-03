import React, { useState, useEffect } from 'react';
import { useAxiosInstance } from '/api/axios'; // Import Axios instance

const TrainCards = () => {
    const [trains, setTrains] = useState([]);
    const axiosInstance = useAxiosInstance(); // Initialize Axios instance

    const [departureStation, setDepartureStation] = useState('');
    const [arrivalStation, setArrivalStation] = useState('');

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

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-4">Available Trains</h2>
                {/* <div className="div">
                    <h1>Departure</h1>
                </div> */}
                 
                {trains.length > 0 ? (
                    <div className='grid grid-cols-3'> 
                        {/* <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">  */}

                        {trains.map(train => (
                            <div key={train._id} className="bg-gray-100  p-4 mb-4 rounded-lg max-w-70">
                                <h3 className="text-xl font-bold">{train.nameOrNumber}</h3>
                                <p>Departure: {train.departureStation}</p>
                                <p>Arrival: {train.arrivalStation}</p>
                                {/* Add more train details here */}

                                <button>Get Full Details</button> 

                            </div>
                            

                            
                        ))}
                        
                        
                    </div>
                ) : (
                    <p>No trains available for the selected stations.</p>
                )}
            </div>
        </>
    );
};

export default TrainCards;
