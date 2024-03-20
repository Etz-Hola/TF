// models/Transport.js

const mongoose = require('mongoose');

const transportSchema = new mongoose.Schema({
  nameOrNumber: {
    type: String,
    required: true
  },
  departureStation: {
    type: String,
    required: true
  },
  ways: {
    type: String,
    enum: ['One Way', 'To and Fro'],
    required: true
  },
  types: [{
    type: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }],
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
  },
  returnTimeFromArrivalStation: {
    type: String
  },
  arrivalTimeDepartureStation: {
    type: String
  }
});

const Transport = mongoose.model('Transport', transportSchema);

module.exports = Transport;
