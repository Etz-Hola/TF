// controllers/transportController.js

const Transport = require('../models/trainTransportModel');

exports.uploadTrainDetails = async (req, res) => {
  try {
    // Extract transport details from the request body
    const {
      nameOrNumber,
      departureStation,
      ways,
      types,
      arrivalStation,
      departureTime,
      arrivalTime,
      duration,
      ticketPrice,
      availableSeats,
      returnTimeFromArrivalStation,
      arrivalTimeDepartureStation
    } = req.body;

    // Save the transport details to the database
    const newTransport = new Transport({
      nameOrNumber,
      departureStation,
      ways,
      types,
      arrivalStation,
      departureTime,
      arrivalTime,
      duration,
      ticketPrice,
      availableSeats,
      returnTimeFromArrivalStation,
      arrivalTimeDepartureStation
    });
    
    await newTransport.save();

    res.status(201).json({ message: 'Transport details uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
