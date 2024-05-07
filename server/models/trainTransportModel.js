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
  firstClassPrice: {
    type: Number,
    required: true
  },
  standardPrice: {
    type: Number,
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
  availableSeats: {
    type: Number,
    required: true
  },
  returnTimeFromArrivalStation: {
    type: String
  },
  arrivalTimeDepartureStation: {
    type: String
  },
  company: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Company', 
    required: true 
  },
  bookings: [{
    date: {
      type: Date,
      required: true
    },
    remainingSeats: {
      type: Number,
      required: true
    },
    bookingsPerDay: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
      departureTime: { type: String },
      arrivalTime: { type: String },
      // seats: { type: Number },
      individualPrice: { type: Number, required: true },
      // totalPrice: { type: Number, required: true },
      timestamp: { type: Date, default: Date.now },
      // New fields for passengers
      passengerName: { type: String, required: true },
      passengerEmail: { type: String, required: true },
      ticketId: { type: String, required: true }
    }]
  }] 
});

// Middleware to calculate remaining seats
transportSchema.pre('save', function(next) {
  this.bookings.forEach(booking => {
    let totalSeatsBooked = 0;
    booking.bookingsPerDay.forEach(b => totalSeatsBooked += b.seats);
    booking.remainingSeats = this.availableSeats - totalSeatsBooked;
  });
  next();
});

const Transport = mongoose.model('Transport', transportSchema);

module.exports = Transport;
 