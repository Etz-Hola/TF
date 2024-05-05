const express = require('express')
const { handleStripeWebhook } = require('../controllers/trainTransportController')
const router = express.Router()


router.post('/webhook',handleStripeWebhook )
module.exports = router
