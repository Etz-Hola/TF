// models/Ticket.js
const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  trainId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Train",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  seats: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return value > 0; // Ensure seats are more than 0
      },
      message: "Seats must be a positive number",
    },
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  seatType: {
    type: String,
    enum: ["firstClass", "standard"],
    required: true,
  },
  ticketId: {
    type: String,
    required: true,
  },
  departureStation: {
    type: String,
    required: true,
  },
  arrivalStation: {
    type: String,
    required: true,
  },
  departureTime: {
    type: Date,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
