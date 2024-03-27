const express = require("express");
const router = express.Router();
const {
  uploadTrainDetails,
  getUploadedTrainDetailsById,
  getAllTrainDetails,
  getUploadedTrainsByCompanyId,
} = require("../controllers/trainTransportController");

// Route to upload train details
router.post("/", uploadTrainDetails);

// Route to fetch uploaded train details by company ID
router.get("/company/:id", getUploadedTrainsByCompanyId);

// Route to fetch All uploaded train details from the database
router.get("/:id", getUploadedTrainDetailsById);

// Route to fetch all train details
router.get("/all-trains/get", getAllTrainDetails);

module.exports = router;
