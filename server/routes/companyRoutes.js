const express = require('express')
const router = express.Router()
// const { protect } = require('../middleware/authMiddleware')

const {
    registerCompany,
    loginCompany,
    activateCompany
  } = require('../controllers/companyController')
 
  
const { uploadTrainDetails } = require('../controllers/trainTransportController');

router.post('/upload-train', uploadTrainDetails);
  router.post("/signup", registerCompany);
  router.post("/login", loginCompany);
  router.post("/activate-account", activateCompany);

  module.exports = router;
