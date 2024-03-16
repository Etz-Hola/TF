// controllers/trainController.js

const Train = require('../models/Train');

exports.uploadTrainDetails = async (req, res) => {
  try {
    // Extract train details from the uploaded file
    const trainDetails = req.file;

    // Save the train details to the database
    const newTrain = new Train({
      trainNumber: req.body.trainNumber,
      route: req.body.route,
      schedule: req.body.schedule,
      availableSeats: req.body.availableSeats,
      detailsFile: trainDetails.path // Save the file path or URL in the database
    });
    
    await newTrain.save();

    res.status(201).json({ message: 'Train details uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
