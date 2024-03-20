const express = require('express');
const router = express.Router();
const { uploadTrainDetails } = require('../controllers/trainTransportController');

router.post('/', uploadTrainDetails);

module.exports = router;
