const express = require('express');
const router = express.Router();

/** Response status 200 schemas
 * @swagger
 * components:
 *  schemas:
 *    updateOrderResponse:
 *      type: object
 *      properties:
 *        updated:
 *          type: boolean
 *        customer:
 *          type: string
 *    orderListResponse:
 *      type: object
 *      properties:
 *        products:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/productSchema'
 *        orderStatus:
 *          type: string
 *          enum: [NOT PROCESSED, PROCESSING, DISPATCHED, CANCELED, COMPLETED, CASH ON DELIVERY]
 *        orderedBy:
 *          type: string
 *        paymentData:
 *          type: object
 *          properties:
 *            paymentIntent:
 *              type: object
 *              $ref: '#/components/schemas/paymentIntent'
 *    iamResponse:
 *      type: object
 *      properties:
 *        role:
 *          type: string
 *        cart:
 *          type: array
 *        wishlist:
 *          type: array
 *        id:
 *          type: string
 *        email:
 *          type: string
 *        name:
 *          type: string
 *        address:
 *          type: object
 *          properties:
 *            address:
 *              type: string
 *            htmlText:
 *              type: string
 *    createCategoryResponse:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        name:
 *          type: string
 *        slug:
 *          type: string
 *    applyCouponResponse:
 *      type: object
 *      properties:
 *        discount:
 *          type: number
 *          example: 0
 *        discountPrice:
 *          type: string
 *          example: string
 *        success:
 *          type: boolean
 *          example: true
 *    addProductWishListResponse:
 *      type: object
 *      properties:
 *        success:
 *          type: boolean
 *          example: true
 */
/**
 * Response error schemas
 * @swagger
 * components:
 *  schemas:
 *    unauthorized:
 *      type: object
 *      properties:
 *        error:
 *          type: string
 *      example:
 *        error: invalid or expired token
 *    notfound:
 *      type: object
 */
module.exports = router;
