// routes/trainRoutes.js

const express = require('express');
const router = express.Router();
const trainController = require('../controllers/trainController');
const upload = require('../middleware/uploadMiddleware');

router.post('/upload', upload.single('trainDetails'), trainController.uploadTrainDetails);

module.exports = router;
