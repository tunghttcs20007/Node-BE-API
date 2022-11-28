const express = require('express');
const router = express.Router();

/** Import Middlewars Function - Auth Controller */
const { authVerifyToken } = require('../middlewares/auth.middleware');

/** Import Stripe Controllers - CRUD */
const { createPaymentIntent } = require('../controllers/stripe.controller');

/**
 * @swagger
 * /payment/stripe:
 *  post:
 *    tags: [Payment]
 *    summary: Submit payment data to stripe to get paymentIntent
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              isApplyCoupon:
 *                type: boolean
 *                example: true
 *    parameters:
 *      - in: header
 *        name: accessToken
 *        description: user access token
 *        schema:
 *          type: string
 *          required: true
 *    responses: 
 *      200:
 *        description: ok
 *      401:
 *        description: unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/unauthorized'
 *      404:
 *        description: not found
 *        content:
 *          aplication/json:
 *            schema:
 *              $ref: '#/components/schemas/notfound'
 */
router.post('/payment/stripe', authVerifyToken, createPaymentIntent);

module.exports = router;
