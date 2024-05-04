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
  timestamp: {
    type: Date,
    default: Date.now,
  },
  seatType: {
    type: String,
    enum: ["firstClass", "standard"],
    required: true,
  },
}, { timestamps: true });

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
