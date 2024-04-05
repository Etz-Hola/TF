import React, { useState, useEffect } from 'react';
import { useAxiosInstance } from '/api/axios'; // Import Axios instance

const TrainCards = () => {
    const [trains, setTrains] = useState([]);
    const axiosInstance = useAxiosInstance(); // Initialize Axios instance

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
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Available Trains</h2>
            {trains.length > 0 ? (
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
                    {trains.map(train => (
                        <TrainCard key={train._id} train={train} />
                    ))}
                </div>
            ) : (
                <p>No trains available for the selected stations.</p>
            )}
        </div>
    );
};

const TrainCard = ({ train }) => {
    const [selectedPrice, setSelectedPrice] = useState('standard');

    const handlePriceChange = (event) => {
        setSelectedPrice(event.target.value);
    };

    return (
        <div className="bg-gray-100 p-4 mb-4 rounded-lg max-w-70">
            <div className="flex justify-between mb-2">
                <div>
                    <div><b>Departure:</b> {train.departureTime}</div>
                    <div><b>Arrival:</b> {train.arrivalTime}</div>
                </div>
                <div>
                    <div><b>Departure Station:</b> {train.departureStation}</div>
                    <div><b>Arrival Station:</b> {train.arrivalStation}</div>
                </div>
            </div>
            <div className="flex justify-between mb-2">
                <div><b>Duration:</b> {train.duration}</div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Book Your Ticket</button>
            </div>
            <div className="flex justify-between mb-2">
                <div>
                    <input 
                        type="checkbox" 
                        id="standard" 
                        value="standard" 
                        checked={selectedPrice === 'standard'} 
                        onChange={handlePriceChange} 
                    />
                    <label htmlFor="standard">Standard: {train.standardPrice}</label>
                </div>
                <div>
                    <input 
                        type="checkbox" 
                        id="firstClass" 
                        value="firstClass" 
                        checked={selectedPrice === 'firstClass'} 
                        onChange={handlePriceChange} 
                    />
                    <label htmlFor="firstClass">1st Class: {train.firstClassPrice}</label>
                </div>
            </div>
        </div>
    );
};

export default TrainCards;
