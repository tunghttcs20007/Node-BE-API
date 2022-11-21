const express = require("express");
const router = express.Router();

/** Import Middlewars Function - Auth Controller */
const { authVerifyToken } = require('../middlewares/auth');

/** Import Stripe Controllers - CRUD */
const { createPaymentIntent } = require('../controllers/stripe');

router.post('/payment/stripe', authVerifyToken, createPaymentIntent);

module.exports = router;
