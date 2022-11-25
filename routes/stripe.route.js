const express = require('express');
const router = express.Router();

/** Import Middlewars Function - Auth Controller */
const { authVerifyToken } = require('../middlewares/auth.middleware');

/** Import Stripe Controllers - CRUD */
const { createPaymentIntent } = require('../controllers/stripe.controller');

router.post('/payment/stripe', authVerifyToken, createPaymentIntent);

module.exports = router;
