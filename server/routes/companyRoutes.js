const express = require('express')
const router = express.Router()
// const { protect } = require('../middleware/authMiddleware')

const {
    registerCompany,
    loginCompany,
  } = require('../controllers/companyController')
 
  router.post("/signup", registerCompany);
  router.post("/login", loginCompany);

  module.exports = router;
