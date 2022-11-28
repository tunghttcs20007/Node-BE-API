const express = require('express');
const router = express.Router();

/** Import Middlewars Function - Auth Controller */
const { authVerifyToken, verifyAdminRole } = require('../middlewares/auth.middleware');

/** Import Sub Category Controllers - CRUD */
const { createCoupon, removeCoupon, getAllCoupons } = require('../controllers/coupon.controller');

/** Routes */

/**
 * @swagger
 * /coupon:
 *  post:
 *    tags: [Coupon]
 *    summary: Create new coupon
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/createCouponPayload'
 *    parameters:
 *      - in: header
 *        name: accessToken
 *        description: admin access token
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
router.post('/coupon', authVerifyToken, verifyAdminRole, createCoupon);

/**
 * @swagger
 * /coupon/list:
 *  get:
 *    tags: [Coupon]
 *    summary: Get all coupons
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
router.get('/coupon/list', authVerifyToken, verifyAdminRole, getAllCoupons);

/**
 * @swagger
 * /coupon/{couponId}:
 *  delete:
 *    tags: [Coupon]
 *    summary: Remove coupon
 *    parameters:
 *      - in: header
 *        name: accessToken
 *        description: admin access token
 *        schema:
 *          type: string
 *          required: true
 *      - in: path
 *        name: couponId
 *        schema:
 *          type: string
 *          required: true
 *          description: couponId
 *    responses: 
 *      204:
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
router.delete('/coupon/:couponId', authVerifyToken, verifyAdminRole, removeCoupon);

module.exports = router;
