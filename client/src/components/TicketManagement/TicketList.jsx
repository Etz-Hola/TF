import React, { useState, useEffect } from 'react';
import { useAxiosInstance } from '/api/axios'; // Corrected import statement

const TicketList = () => {
  const user = JSON.parse(localStorage.getItem("ticket-flow"));
  const userId = user?.result?._id || null;

  const axiosInstance = useAxiosInstance();

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      if (!userId) {
        setError("User data is not available");
        setLoading(false);
        return;
      }

      try {
        const response = await axiosInstance.get(`/trains/tickets/${userId}`);
        setTickets(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching tickets");
        setLoading(false);
      }
    };

    fetchTickets();
  }, [userId, axiosInstance]); // Include axiosInstance in the dependency array

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className=" mx-auto bg-white shadow-md rounded-md overflow-hidden">
        <h1 className="text-xl font-bold mb-4  justify-center ">Ticket DEtails</h1>
      <div className="p-4">
        {tickets.length === 0 && <p className="text-red-600 font-semibold mb-4">No tickets found</p>}
        {tickets.length > 0 && (
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Passenger Name</th>
                <th className="text-left">Date</th>
                <th className="text-left">Departure</th>
                <th className="text-left">Arrival</th>
                <th className="text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map(ticket => (
                <tr key={ticket.ticketId} className="border-b border-gray-200">
                  <td className="py-2">{ticket.passengerName}</td>
                  <td className="py-2">{new Date(ticket.date).toDateString()}</td>
                  <td className="py-2">{ticket.departureStation} ({ticket.departureTime})</td>
                  <td className="py-2">{ticket.arrivalStation} ({ticket.arrivalTime})</td>
                  <td className="py-2">${ticket.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TicketList;




// import { useState, useEffect } from 'react';
// import { useAxiosInstance } from '/api/axios'; // Corrected import statement

// const TicketList = () => {
//   const user = JSON.parse(localStorage.getItem("ticket-flow"));
//   const userId = user?.result?._id || null;

//   const axiosInstance = useAxiosInstance(); // Corrected usage of useAxiosInstance

//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchTickets = async () => {
//       if (!userId) {
//         setError("User data is not available");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axiosInstance.get(`/trains/tickets/${userId}`);
//         setTickets(response.data);
//         setLoading(false);
//       } catch (error) {
//         setError("Error fetching tickets");
//         setLoading(false);
//       }
//     };

//     fetchTickets();
//   }, [userId, axiosInstance]); // Include axiosInstance in the dependency array

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="max-w-md mx-auto bg-white shadow-md rounded-md overflow-hidden">
//       <div className="p-4">
//         <h1 className="text-xl font-bold mb-4">Your Tickets</h1>
//         {tickets.length === 0 && <p className="text-red-600 font-semibold mb-4">No tickets found</p>}
//         {tickets.map(ticket => (
//           <div key={ticket.ticketId} className="border-b border-gray-200 pb-4 mb-4">
//             <p className="text-lg font-semibold mb-2">{ticket.passengerName}</p>
//             <p className="text-gray-600 mb-2">Date: {new Date(ticket.date).toDateString()}</p>
//             <p className="text-gray-600 mb-2">Departure: {ticket.departureStation} ({ticket.departureTime})</p>
//             <p className="text-gray-600 mb-2">Arrival: {ticket.arrivalStation} ({ticket.arrivalTime})</p>
//             <p className="text-gray-600 mb-2">Price: ${ticket.price}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TicketList; 
