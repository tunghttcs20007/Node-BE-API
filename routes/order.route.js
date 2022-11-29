const express = require('express');
const router = express.Router();

/** Import Middlewars Function - Auth Controller */
const { authVerifyToken } = require('../middlewares/auth.middleware');

/** Import Sub Category Controllers - CRUD */
const {
	createOnlinePaymentOrder,
	getAllOrders,
	createCODPaymentOrder,
} = require('../controllers/order.controller');

/** Routes */

/**
 * @swagger
 * /order/online:
 *  post:
 *    tags: [Order]
 *    summary: Create online order
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/paymentIntent'
 *    parameters:
 *      - in: header
 *        name: accessToken
 *        description: user access token
 *        schema:
 *          type: string
 *          required: true
 *    responses: 
 *      201:
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
router.post('/order/online', authVerifyToken, createOnlinePaymentOrder);

/**
 * @swagger
 * /order/cod:
 *  post:
 *    tags: [Order]
 *    summary: Create cash on delivery order
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/createCodOrderPayload'
 *    parameters:
 *      - in: header
 *        name: accessToken
 *        description: user access token
 *        schema:
 *          type: string
 *          required: true
 *    responses: 
 *      201:
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
router.post('/order/cod', authVerifyToken, createCODPaymentOrder);

/**
 * @swagger
 * /order/list-all:
 *  get:
 *    tags: [Order]
 *    summary: Get current logged in user order
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
router.get('/order/list-all', authVerifyToken, getAllOrders);

module.exports = router;
