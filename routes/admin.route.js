const express = require('express');
const router = express.Router();

/** Import Middlewars Function - Auth Controller */
const { authVerifyToken, verifyAdminRole } = require('../middlewares/auth.middleware');

/** Import User Controllers - CRUD */
const { getAllOrders, updateOrderStatus } = require('../controllers/admin.controller');

/**
 * @swagger
 * /admin/order/list-all:
 *  get:
 *    tags: [Admin]
 *    summary: Get all submitted orders
 *    parameters:
 *      - in: header
 *        name: accessToken
 *        description: admin access token
 *        schema:
 *          type: string
 *          required: true
 *    responses: 
 *      200:
 *        description: ok
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/orderListResponse'
 *      401:
 *        description: Unauthorized
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
router.get('/admin/order/list-all', authVerifyToken, verifyAdminRole, getAllOrders);

/**
 * @swagger
 * /admin/order/status:
 *  put:
 *    tags: [Admin]
 *    summary: Update order status
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/updatedOrderPayload'
 *          example:
 *            orderId: string
 *            orderStatus: string
 *    parameters:
 *      - in: header
 *        name: accessToken
 *        description: admin access token
 *        schema:
 *          type: string
 *          required: true
 *    responses: 
 *      200:
 *        description: ok
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/updateOrderResponse'
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
router.put('/admin/order/status', authVerifyToken, verifyAdminRole, updateOrderStatus);

module.exports = router;
