// models/Train.js

const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
  trainName: {
    type: String,
    required: true
  },
  trainNumber: {
    type: String,
    required: true,
    unique: true
  },
  departureStation: {
    type: String,
    required: true
  },
  arrivalStation: {
    type: String,
    required: true
  },
  departureTime: {
    type: String,
    required: true
  },
  arrivalTime: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  ticketPrice: {
    type: Number,
    required: true
  },
  availableSeats: {
    type: Number,
    required: true
  }
});

const Train = mongoose.model('Train', trainSchema);

module.exports = Train;
