const express = require('express');
const router = express.Router();

/** Firebase Auth Schema
 * @swagger
 * components:
 *  schemas:
 *    firebaseAuth:
 *      type: object
 *      required: true
 *      properties:
 *        returnSecureToken:
 *          type: boolean
 *        email:
 *          type: string
 *        password:
 *          type: string
 *      example:
 *        returnSecureToken: true
 *        email: cloud_test1@email.com
 *        password: test@123
 */
/** Request body schemas
 * @swagger
 * components:
 *  schemas:
 *    updatedOrderPayload:
 *      type: object
 *      properties:
 *        orderId:
 *          type: string
 *        orderStatus:
 *          type: string
 *          enum: [NOT PROCESSED, PROCESSING, DISPATCHED, CANCELED, COMPLETED, CASH ON DELIVERY]
 *    createCategoryPayload:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *    createCommentPayload:
 *      type: object
 *      properties:
 *        content:
 *          type: string
 *          example: string
 *        productId:
 *          type: string
 *          example: string
 *    updateCommentPayload:
 *      type: object
 *      properties:
 *        content:
 *          type: string
 *          example: string
 *    addCmtLikeBody:
 *      type: object
 *      properties:
 *        userId:
 *          type: string
 *          example: string
 *        productId:
 *          type: string
 *          example: string
 *    createCouponPayload:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          example: string
 *        expiry:
 *          type: string
 *          example: string
 *        discount:
 *          type: number
 *          example: 0
 *    createCodOrderPayload:
 *      type: object
 *      properties:
 *        cod:
 *          type: boolean
 *          example: true
 *        coupon:
 *          type: boolean
 *          example: true
 *    createSubCategoryPayload:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          example: string
 *        parentCategory:
 *          type: string
 *          example: categoryId
 *    updateUserAddressPayload:
 *      type: object
 *      properties:
 *        address:
 *          type: object
 *          properties:
 *            address:
 *              type: string
 *              example: string
 *            htmlText:
 *              type: string
 *              example: <p>string</p>
 *    applyCouponPayload:
 *      type: object
 *      properties:
 *        coupon:
 *          type: string
 *          example: string
 *    addProductWishlistPayload:
 *      type: object
 *      properties:
 *        productId:
 *          type: string
 *          example: string
 *    getProductsSortedList:
 *      type: object
 *      properties:
 *        sort:
 *          type: string
 *          example: string
 *        order:
 *          type: enum
 *          enum: [asc, desc]
 *          example: asc
 *        page:
 *          type: number
 *          example: 1
 *        limit:
 *          type: number
 *          example: 1
 */
/** Search schema
 * @swagger
 * components:
 *  schemas:
 *    searchQuery:
 *      type: object
 *      properties:
 *        query:
 *          type: string
 *          example: string
 *        price:
 *          type: array
 *          example: [0, 4999]
 *        category:
 *          type: string
 *          example: string
 *        stars:
 *          type: string
 *          example: string
 *        subCategory:
 *          type: string
 *          example: string
 *        shipping:
 *          type: string
 *          example: string
 *        color:
 *          type: string
 *          example: string
 *        brand:
 *          type: string
 *          example: string
 */
module.exports = router;
