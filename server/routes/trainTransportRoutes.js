const express = require("express");
const router = express.Router();
const {
  uploadTrainDetails,
  getUploadedTrainDetailsById,
  getAllTrainDetails,
} = require("../controllers/trainTransportController");

router.post("/", uploadTrainDetails);

// Route to fetch uploaded train details from the database
router.get("/:id", getUploadedTrainDetailsById);

// Route to fetch all train details
router.get("/all-trains/get", getAllTrainDetails);

module.exports = router;
