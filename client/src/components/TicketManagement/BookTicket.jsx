import React, { useState, useEffect } from 'react';
import { useAxiosInstance } from '/api/axios';
import { useParams } from 'react-router-dom';
import useShowToast from '../../hooks/useShowToast';

const BookTicket = () => {
  const { trainId } = useParams();
  const [seatType, setSeatType] = useState(null);
  const [numberOfSeats, setNumberOfSeats] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const axiosInstance = useAxiosInstance();
  const showToast = useShowToast();

  useEffect(() => {
    calculateTotalPrice();
  }, [seatType, numberOfSeats]);

  const calculateTotalPrice = () => {
    if (!seatType) return;

    axiosInstance.get(`/trains/${trainId}`)
      .then(response => {
        const train = response.data;
        const price = (seatType === 'firstClass') ? train.firstClassPrice : train.standardPrice;
        setTotalPrice(price * numberOfSeats);
      })
      .catch(error => {
        console.error('Error fetching train details:', error);
        showToast('Error fetching train details. Please try again later.', 'error');
      });
  };

  const handleSeatTypeChange = type => {
    setSeatType(type);
  };

  const handleBookTicket = async () => {
    try {
      const response = await axiosInstance.post('/tickets/book', {
        trainId: trainId,
        seatType: seatType,
        numberOfSeats: numberOfSeats,
      });
      console.log('Ticket booked successfully:', response.data);
      showToast('Ticket booked successfully!', 'success');
    } catch (error) {
      console.error('Error booking ticket:', error);
      showToast('Error booking ticket. Please try again later.', 'error');
    }
  };

  return (
    <div className='mt-20'>
      <h2 className='text-4xl font-bold text-center'>Book Tickets</h2>
      <div className='flex items-center'>
        <label className='font-bold'>Number of Seats:</label>
        <input 
          type="number" 
          value={numberOfSeats} 
          onChange={e => setNumberOfSeats(parseInt(e.target.value))} 
          className='ml-2 border border-gray-300 rounded-md px-2 py-1'
        />
      </div>
      <div className='mt-4'>
        <label className='font-bold'>Seat Type:</label>
        <div className='ml-2 flex items-center'>
          <input 
            type="radio" 
            id="standard" 
            name="seatType" 
            checked={seatType === 'standard'} 
            onChange={() => handleSeatTypeChange('standard')} 
            className='mr-1'
          />
          <label htmlFor="standard" className='mr-4'>Standard</label>
          <input 
            type="radio" 
            id="firstClass" 
            name="seatType" 
            checked={seatType === 'firstClass'} 
            onChange={() => handleSeatTypeChange('firstClass')} 
            className='mr-1'
          />
          <label htmlFor="firstClass">First Class</label>
        </div>
      </div>
      <div className='mt-4'>
        <label className='font-bold'>Total Price:</label>
        <span className='ml-2'>${totalPrice.toFixed(2)}</span>
      </div>
      <div className='mt-8 flex justify-center'>
        <button 
          onClick={handleBookTicket} 
          className='px-4 py-2 bg-indigo-500 text-white rounded-md shadow-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600'
        >
          Make Payment
        </button>
      </div>
    </div>
  );
};

export default BookTicket;
