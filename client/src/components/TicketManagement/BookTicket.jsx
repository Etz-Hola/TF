import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
import { format } from "date-fns";
import { useAxiosInstance } from '/api/axios';
import { useParams } from 'react-router-dom'; // Import useHistory
import useShowToast from '../../hooks/useShowToast';
import { v4 as uuid } from 'uuid';

const todayDate = new Date();


const BookTicket = () => {
  const { trainId } = useParams();
  const [train, setTrain] = useState(null);
  const [seatType, setSeatType] = useState(null);
  const [numberOfSeats, setNumberOfSeats] = useState(1);
  const [passengers, setPassengers] = useState([{ name: '', email: '' }]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedDate, setSelectedDate] = useState(todayDate);

  const [standardPrice, setStandardPrice] = useState(0);
  const [firstClassPrice, setFirstClassPrice] = useState(0);
  const axiosInstance = useAxiosInstance();
  const showToast = useShowToast();
  
  const user = JSON.parse(localStorage.getItem("ticket-flow"));
  const userId = user.result._id


  useEffect(() => {
    fetchTrainDetails();
  }, [trainId]);

  const fetchTrainDetails = async () => {
    try {
      const response = await axiosInstance.get(`/trains/${trainId}`); // Correct API route
      setTrain(response.data);
      setSeatType('standard');
      setStandardPrice(response.data.standardPrice);
      setFirstClassPrice(response.data.firstClassPrice);
    } catch (error) {
      console.error('Error fetching train details:', error);
      setTrain(null);
      showToast('Error fetching train details. Please try again later.', 'error');
    }
  };

  const handleDateChange = useCallback((e) => {
    setSelectedDate(new Date(e.target.value));
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [seatType, numberOfSeats, standardPrice, firstClassPrice]);

  const calculateTotalPrice = () => {
    if (!seatType || !train) return;

    const pricePerSeat = seatType === 'firstClass' ? firstClassPrice : standardPrice;
    console.log(pricePerSeat)
    if (isNaN(pricePerSeat)) return;

    const totalPrice = pricePerSeat * numberOfSeats;
    setTotalPrice(totalPrice);
  };

  const handleSeatsChange = (e) => {
    const seats = parseInt(e.target.value);
    setNumberOfSeats(seats);
    const newPassengers = Array.from({ length: seats }, () => ({ name: '', email: '' }));
    setPassengers(newPassengers);
  };

  const handleSeatTypeChange = (type) => {
    setSeatType(type);
  };

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][field] = value;
    setPassengers(updatedPassengers);
  };


  // const handleBookTicket = async () => {
  //   try {
  //     if (!train || !seatType || !numberOfSeats || passengers.some(passenger => !passenger.name || !passenger.email)) {
  //       showToast('Please fill all passenger details.', 'error');
  //       return;
  //     }

  //     const totalSeats = passengers.reduce((acc, curr) => acc + curr.numberOfSeats, 0);
  //     if (totalSeats > train.availableSeats) {
  //       showToast('Not enough seats available.', 'error');
  //       return;
  //     }

  //     const transportId = trainId // Change trainId to transportId
  //     const bookingDetails = passengers.map(passenger => {
  //       return {
  //         user: userId, // Assuming user is not being sent from the frontend
  //         departureTime: train.departureTime, // Adjust as needed
  //         arrivalTime: train.arrivalTime, // Adjust as needed
  //         // seats: passenger.numberOfSeats,
  //         individualPrice: handleSeatTypeChange === 'standard' ? standardPrice : firstClassPrice, // Assuming same price for all seats
  //         // totalPrice: passenger.numberOfSeats * train.standardPrice,
  //         passengerName: passenger.name,
  //         passengerEmail: passenger.email,
  //         ticketId: uuid().slice(0, 18) // Implement your own ticket ID generation function
  //       }
  //     });

  //     const bookings = {
  //       date: selectedDate, // You may want to specify the date of booking
  //       bookingData: bookingDetails
  //     }
  //     console.log(bookings)

  //     const response = await axiosInstance.post(`/trains/${transportId}/bookings`, { userId, totalPrice: totalPrice, bookings }) // Adjust the endpoint

  //     // console.log(response)
  //     window.location.assign(response.data.url);

  //     // console.log('Tickets booked successfully:', responses.map(res => res.data));
  //     showToast('Continue with the payment!', 'success');

  //     // Redirect to booked tickets page
  //     // history.push(`/booked-tickets/${trainId}`);
  //   } catch (error) {
  //     console.error('Error booking tickets:', error);
  //     showToast('Error booking tickets. Please try again later.', 'error');
  //   }
  // };



  const handleBookTicket = async () => {
    try {
      if (!train || !seatType || !numberOfSeats || passengers.some(passenger => !passenger.name || !passenger.email)) {
        showToast('Please fill all passenger details.', 'error');
        return;
      }
  
      const totalSeats = passengers.reduce((acc, curr) => acc + curr.numberOfSeats, 0);
      if (totalSeats > train.availableSeats) {
        showToast('Not enough seats available.', 'error');
        return;
      }
  
      const transportId = trainId; // Change trainId to transportId
      const bookingDetails = passengers.map(passenger => ({
        user: userId, // Assuming user is not being sent from the frontend
        departureTime: train.departureTime, // Adjust as needed
        arrivalTime: train.arrivalTime, // Adjust as needed
        individualPrice: handleSeatTypeChange === 'standard' ? standardPrice : firstClassPrice, // Assuming same price for all seats
        passengerName: passenger.name,
        passengerEmail: passenger.email,
        ticketId: uuid().slice(0, 18) // Implement your own ticket ID generation function
      }));
  
      const bookings = {
        date: selectedDate, // You may want to specify the date of booking
        bookingData: bookingDetails
      };
  
      console.log("bookings", bookings); // Ensure correct structure of bookings object
  
      const response = await axiosInstance.post(`/trains/${transportId}/bookings`, { userId, totalPrice: totalPrice, bookings }); // Adjust the endpoint
  
      // console.log(response)
      window.location.assign(response.data.url);
  
      // console.log('Tickets booked successfully:', responses.map(res => res.data));
      showToast('Continue with the payment!!', 'success');
  
      // Redirect to booked tickets page
      // history.push(`/booked-tickets/${trainId}`);
    } catch (error) {
      console.error('Error booking tickets:', error);
      showToast('Error booking tickets. Please try again later.', 'error');
    }
  };
  


  if (!train) return <div>Loading...</div>;

  return (
    <div className='mt-20'>
      <h2 className='text-4xl font-bold text-center'>Book Tickets</h2>
      <div className='flex items-center'>
        <label className='font-bold'>Number of Seats:</label>
        <input
          type="number"
          value={numberOfSeats}
          onChange={handleSeatsChange}
          className='ml-2 border border-gray-300 rounded-md px-2 py-1'
        />
      </div>
      <div className='flex items-center mt-10'>
        <label className='font-bold'>Select Date:</label>
        <input
          placeholder="Select Date and Time"
          type="date"
          value={format(selectedDate, "yyyy-MM-dd")}
          onChange={handleDateChange}
          min={format(todayDate, "yyyy-MM-dd")}
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
      <div className='mt-4'>
        {passengers.map((passenger, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Passenger Name"
              value={passenger.name}
              onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
              className='mt-2 border border-gray-300 rounded-md px-2 py-1'
            />
            <input
              type="email"
              placeholder="Passenger Email"
              value={passenger.email}
              onChange={(e) => handlePassengerChange(index, 'email', e.target.value)}
              className='mt-2 border border-gray-300 rounded-md px-2 py-1'
            />
          </div>
        ))}
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


















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAxiosInstance } from '/api/axios';
// import { useParams, useHistory } from 'react-router-dom'; // Import useHistory
// import useShowToast from '../../hooks/useShowToast';
// import BookedTickets from './BookedTickets';

// const BookTicket = () => {
//   const { trainId } = useParams();
//   const [train, setTrain] = useState(null);
//   const [seatType, setSeatType] = useState(null);
//   const [numberOfSeats, setNumberOfSeats] = useState(1);
//   const [passengers, setPassengers] = useState([{ name: '', email: '' }]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [standardPrice, setStandardPrice] = useState(0);
//   const [firstClassPrice, setFirstClassPrice] = useState(0);
//   const [bookedTickets, setBookedTickets] = useState([]);
//   const axiosInstance = useAxiosInstance();
//   const showToast = useShowToast();
//   const history = useHistory(); // Initialize useHistory

//   useEffect(() => {
//     fetchTrainDetails();
//     fetchBookedTickets(); // Fetch booked tickets when component mounts
//   }, [trainId]);

//   const fetchTrainDetails = async () => {
//     try {
//       const response = await axios.get(`/train/api/trains/${trainId}`);
//       setTrain(response.data);
//       setSeatType('standard');
//       setStandardPrice(response.data.standardPrice);
//       setFirstClassPrice(response.data.firstClassPrice);
//     } catch (error) {
//       console.error('Error fetching train details:', error);
//       setTrain(null);
//       showToast('Error fetching train details. Please try again later.', 'error');
//     }
//   };

//   const fetchBookedTickets = async () => {
//     try {
//       const response = await axiosInstance.get(`/tickets/bookings/${trainId}`);
//       setBookedTickets(response.data.bookings);
//     } catch (error) {
//       console.error('Error fetching booked tickets:', error);
//       showToast('Error fetching booked tickets. Please try again later.', 'error');
//     }
//   };

//   const calculateTotalPrice = () => {
//     if (!seatType || !train || !train.availableSeats) return;

//     let pricePerSeat;
//     if (seatType === 'firstClass') {
//       pricePerSeat = firstClassPrice || 0;
//     } else {
//       pricePerSeat = standardPrice || 0;
//     }

//     if (isNaN(pricePerSeat)) return;

//     const totalPrice = pricePerSeat * numberOfSeats;
//     setTotalPrice(totalPrice);
//   };

//   useEffect(() => {
//     calculateTotalPrice();
//   }, [seatType, numberOfSeats, train]);

//   const handleSeatsChange = (e) => {
//     setNumberOfSeats(parseInt(e.target.value));
//     const newPassengers = [];
//     for (let i = 0; i < parseInt(e.target.value); i++) {
//       newPassengers.push({
//         name: '',
//         email: ''
//       });
//     }
//     setPassengers(newPassengers);
//   };

//   const handleSeatTypeChange = (type) => {
//     setSeatType(type);
//   };

//   const handlePassengerChange = (index, field, value) => {
//     const updatedPassengers = [...passengers];
//     updatedPassengers[index][field] = value;
//     setPassengers(updatedPassengers);
//   };

//   const handleBookTicket = async () => {
//     try {
//       if (!train || !seatType || !numberOfSeats || passengers.some(passenger => !passenger.name || !passenger.email)) {
//         showToast('Please fill all passenger details.', 'error');
//         return;
//       }

//       if (numberOfSeats > train.availableSeats) {
//         showToast('Not enough seats available.', 'error');
//         return;
//       }

//       const bookings = passengers.map(passenger => ({
//         trainId: trainId,
//         seatType: seatType,
//         numberOfSeats: 1,
//         passengerName: passenger.name,
//         passengerEmail: passenger.email
//       }));
//       const responses = await Promise.all(bookings.map(booking =>
//         axiosInstance.post(`/tickets/bookings`, booking)
//       ));
//       console.log('Tickets booked successfully:', responses.map(res => res.data));
//       showToast('Tickets booked successfully!', 'success');
//       setPassengers([{ name: '', email: '' }]);
//       fetchBookedTickets(); // Fetch updated booked tickets after successful booking
//       history.push('/booked-tickets'); // Navigate to BookedTickets after successful booking
//     } catch (error) {
//       console.error('Error booking tickets:', error);
//       showToast('Error booking tickets. Please try again later.', 'error');
//     }
//   };

//   if (!train) return <div>Loading...</div>;

//   return (
//     <div className='mt-20'>
//       <h2 className='text-4xl font-bold text-center'>Book Tickets</h2>
//       <div className='flex items-center'>
//         <label className='font-bold'>Number of Seats:</label>
//         <input
//           type="number"
//           value={numberOfSeats}
//           onChange={handleSeatsChange}
//           className='ml-2 border border-gray-300 rounded-md px-2 py-1'
//         />
//       </div>
//       <div className='mt-4'>
//         <label className='font-bold'>Seat Type:</label>
//         <div className='ml-2 flex items-center'>
//           <input
//             type="radio"
//             id="standard"
//             name="seatType"
//             checked={seatType === 'standard'}
//             onChange={() => handleSeatTypeChange('standard')}
//             className='mr-1'
//           />
//           <label htmlFor="standard" className='mr-4'>Standard</label>
//           <input
//             type="radio"
//             id="firstClass"
//             name="seatType"
//             checked={seatType === 'firstClass'}
//             onChange={() => handleSeatTypeChange('firstClass')}
//             className='mr-1'
//           />
//           <label htmlFor="firstClass">First Class</label>
//         </div>
//       </div>
//       <div className='mt-4'>
//         <label className='font-bold'>Total Price:</label>
//         <span className='ml-2'>${totalPrice.toFixed(2)}</span>
//       </div>
//       <div className='mt-4'>
//         {passengers.map((passenger, index) => (
//           <div key={index}>
//             <input
//               type="text"
//               placeholder="Passenger Name"
//               value={passenger.name}
//               onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
//               className='mt-2 border border-gray-300 rounded-md px-2 py-1'
//             />
//             <input
//               type="email"
//               placeholder="Passenger Email"
//               value={passenger.email}
//               onChange={(e) => handlePassengerChange(index, 'email', e.target.value)}
//               className='mt-2 border border-gray-300 rounded-md px-2 py-1'
//             />
//           </div>
//         ))}
//       </div>
//       <div className='mt-8 flex justify-center'>
//         <button
//           onClick={handleBookTicket}
//           className='px-4 py-2 bg-indigo-500 text-white rounded-md shadow-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600'
//         >
//           Make Payment
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BookTicket;

