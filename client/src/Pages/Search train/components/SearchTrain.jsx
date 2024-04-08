// import React, { useState, useEffect } from 'react';
// import { useAxiosInstance } from '/api/axios'; // Import Axios instance
// import useShowToast from '../../../hooks/useShowToast'; // Import useShowToast hook

// const AvailableTrains = () => {
//   const [trains, setTrains] = useState([]);
//   const [departureStation, setDepartureStation] = useState('');
//   const [arrivalStation, setArrivalStation] = useState('');
//   const [selectedDate, setSelectedDate] = useState('');
//   const [departureStations, setDepartureStations] = useState([]);
//   const [arrivalStations, setArrivalStations] = useState([]);
//   const axiosInstance = useAxiosInstance();
//   const showToast = useShowToast();

//   useEffect(() => {
//     fetchStations();
//   }, []);

//   useEffect(() => {
//     if (departureStation) {
//       const filtered = arrivalStations.filter(el => el.toLowerCase() !== departureStation.toLowerCase());
//       setArrivalStations(filtered);
//     }
//   }, [departureStation]);

//   const fetchStations = async () => {
//     try {
//       const response = await axiosInstance.get('/trains/get/search/station');
//       const { departureStations, arrivalStations } = response.data;
//       setDepartureStations(departureStations);
//       setArrivalStations(arrivalStations);
//     } catch (error) {
//       console.error('Error fetching stations:', error);
//       showToast('Error fetching stations. Please try again later.', 'error');
//     }
//   };

//   const fetchTrains = async () => {
//     try {
//       const response = await axiosInstance.get('/trains/get/station', {
//         params: {
//           departureStation: departureStation,
//           arrivalStation: arrivalStation,
//           selectedDate: selectedDate,
//         },
//       });
//       setTrains(response.data || []);
      
//       // Check if no trains were found
//       if (response.data.length === 0) {
//         showToast('No trains found for the selected criteria.', 'info');
//       }
//     } catch (error) {
//       console.error('Error fetching trains:', error);
//       showToast('Error fetching trains. Please try again later.', 'error');
//     }
//   };

//   const handleSearch = () => {
//     fetchTrains();
//   };

//   return (
//     <div className="container mx-auto mt-8">
//       <div className="flex justify-center items-center mb-4">
//         <select
//           value={departureStation}
//           onChange={(e) => setDepartureStation(e.target.value)}
//           className="border rounded mr-2 p-2"
//         >
//           <option value="">Departure Station</option>
//           {departureStations.map((station, index) => (
//             <option key={index} value={station}>{station}</option>
//           ))}
//         </select>

//         <select
//           value={arrivalStation}
//           onChange={(e) => setArrivalStation(e.target.value)}
//           className="border rounded mr-2 p-2"
//         >
//           <option value="">Arrival Station</option>
//           {arrivalStations.map((station, index) => (
//             <option key={index} value={station}>{station}</option>
//           ))}
//         </select>

//         <input
//           type="date"
//           value={selectedDate}
//           onChange={(e) => setSelectedDate(e.target.value)}
//           className="border rounded p-2"
//         />

//         <button
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           onClick={handleSearch}
//         >
//           Search
//         </button>
//       </div>

//       <div className="bg-pic">
//         <table className="styled-table">
//           <thead>
//             <tr>
//               <th>Train Name/Number</th>
//               <th>Departure Station</th>
//               <th>Arrival Station</th>
//               <th>Departure Time</th>
//               <th>Arrival Time</th>
//               <th>Duration</th>
//               <th>Available Seats</th>
//             </tr>
//           </thead>
//           <tbody>
//             {trains.map((train, index) => (
//               <tr key={index}>
//                 <td>{train.nameOrNumber}</td>
//                 <td>{train.departureStation}</td>
//                 <td>{train.arrivalStation}</td>
//                 <td>{train.departureTime}</td>
//                 <td>{train.arrivalTime}</td>
//                 <td>{train.duration}</td>
//                 <td>{train.availableSeats}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AvailableTrains;

