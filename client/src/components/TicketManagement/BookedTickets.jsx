import React from 'react';

const BookedTickets = ({ tickets }) => {
  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Booked Tickets</h2>
      {tickets.map((ticket, index) => (
        <div key={index} className='border border-gray-300 rounded-md p-4 mb-4'>
          <h3 className='text-xl font-semibold mb-2'>Ticket {index + 1}</h3>
          <p><span className='font-semibold'>Date and Time Created:</span> {new Date(ticket.timestamp).toLocaleString()}</p>
          <p><span className='font-semibold'>Train:</span> {ticket.train.nameOrNumber}</p>
          <p><span className='font-semibold'>Departure Station and Time:</span> {ticket.train.departureStation} ({ticket.train.departureTime})</p>
          <p><span className='font-semibold'>Arrival Station and Time:</span> {ticket.train.arrivalStation} ({ticket.train.arrivalTime})</p>
          <p><span className='font-semibold'>Seat Type:</span> {ticket.seatType}</p>
          <p><span className='font-semibold'>Ticket Price:</span> ${ticket.totalPrice.toFixed(2)}</p>
          {ticket.seats > 1 && (
            <div>
              <h4 className='text-lg font-semibold mt-2'>Passengers:</h4>
              {ticket.passengers.map((passenger, idx) => (
                <div key={idx}>
                  <p><span className='font-semibold'>Passenger {idx + 1}:</span></p>
                  <p>Name: {passenger.name}</p>
                  <p>Email: {passenger.email}</p>
                  <p>Ticket Number: {passenger.ticketNumber}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BookedTickets;
