// controllers/trainController.js

const Train = require('../models/Train');

exports.uploadTrainDetails = async (req, res) => {
  try {
    // Extract train details from the request body
    const {
      trainName,
      trainNumber,
      departureStation,
      arrivalStation,
      departureTime,
      arrivalTime,
      duration,
      ticketPrice,
      availableSeats
    } = req.body;

    // Save the train details to the database
    const newTrain = new Train({
      trainName,
      trainNumber,
      departureStation,
      arrivalStation,
      departureTime,
      arrivalTime,
      duration,
      ticketPrice,
      availableSeats
    });
    
    await newTrain.save();

    res.status(201).json({ message: 'Train details uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
