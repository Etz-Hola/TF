// import React, { useState, useEffect } from 'react';
// import { useAxiosInstance } from '/api/axios';
// import useShowToast from '/hooks/useShowToast'; // Import useShowToast hook

// const TicketBooking = () => {
//   const [tickets, setTickets] = useState([]);
//   const axiosInstance = useAxiosInstance();
//   const showToast = useShowToast();

//   useEffect(() => {
//     fetchBookedTickets();
//   }, []);

//   const fetchBookedTickets = async () => {
//     try {
//       const response = await axiosInstance.get('/tickets/booked');
//       setTickets(response.data);
//     } catch (error) {
//       console.error('Error fetching booked tickets:', error);
//       showToast('Error fetching booked tickets. Please try again later.', 'error');
//     }
//   };

//   return (
//     <div className="mt-8">
//       <h2 className="text-2xl font-bold mb-4">Booked Tickets</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {tickets.map(ticket => (
//           <div key={ticket._id} className="border p-4 rounded-md shadow-md">
//             <h3 className="text-lg font-semibold">{`Ticket ID: ${ticket.ticketId}`}</h3>
//             <p>{`Departure Station: ${ticket.departureStation}`}</p>
//             <p>{`Arrival Station: ${ticket.arrivalStation}`}</p>
//             <p>{`Duration: ${ticket.duration}`}</p>
//             <p>{`Number of Seats: ${ticket.seats}`}</p>
//             <p>{`Total Price: $${ticket.totalPrice}`}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TicketBooking;
