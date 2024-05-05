const express = require("express");
const router = express.Router();
const { createBooking } = require("../controllers/trainTransportController");

const {
  uploadTrainDetails,
  getUploadedTrainDetailsById,
  getAllTrainDetails,
  getUploadedTrainsByCompanyId,
  updateTrainDetails,
  getTrainsByStations,
  searchTrainsByStations,
  getOutboundTrains,
  getReturnTrains,
  getTicketPrice,
  // createBooking,
  getBookingsByDate,
  getBookedTickets,
  purchaseTicket
  


} = require("../controllers/trainTransportController");

// Route to upload train details
router.post("/", uploadTrainDetails);

// Route for updating train details
router.put("/:id", updateTrainDetails);

// Route to fetch uploaded train details by company ID   
router.get("/company/:companyId", getUploadedTrainsByCompanyId);

// Route to fetch All uploaded train details from the database
router.get("/:id", getUploadedTrainDetailsById);

// Route to fetch all train details
router.get("/all-trains/get", getAllTrainDetails);

// Route to fetch train details by station
router.get('/get/station', getTrainsByStations);

// Route to search train details by station
router.get('/get/search/station', searchTrainsByStations);

// Route to fetch outbound trains
router.get('/outbound', getOutboundTrains);

// Route to fetch return trains
router.get('/return', getReturnTrains);

// Route to fetch ticket price by ticket class
router.get('/:trainId/price/:class', getTicketPrice);

// Route to create a booking for a specific train on a specific date
router.post('/:trainId/bookings', purchaseTicket);

// Route to fetch booked tickets for a specific train on a specific date
router.get('/:trainId/booked-tickets/:date', getBookingsByDate);

// Route to fetch booked tickets for a specific train
router.get('/:trainId/booked-tickets', getBookedTickets);

module.exports = router;
