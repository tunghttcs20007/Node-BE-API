const express = require('express');
const router = express.Router();

/** Order Schema
 * @swagger
 * components:
 *  schemas:
 *    orderSchema:
 *      type: object
 *      properties:
 *        products:
 *          type: array
 *          items:
 *            type: object
 *            $ref: '#/components/schemas/orderProductItem'
 *        paymentData:
 *            type: object
 *            properties:
 *               paymentIntent:
 *                  type: object
 *                  $ref: '#/components/schemas/paymentIntent'
 *        orderStatus:
 *          type: enum
 *          enum: [NOT PROCESSED, PROCESSING, DISPATCHED, CANCELED, COMPLETED, CASH ON DELIVERY]
 *        orderedBy:
 *          type: string
 */
/** Like Schema
 * @swagger
 * components:
 *  schemas:
 *    likeSchema:
 *      type: object
 *      properties:
 *        userId:
 *          type: string
 *        productId:
 *          type: string
 *        commentId:
 *          type: number
 */
/** Dislike Schema
 * @swagger
 * components:
 *  schemas:
 *    dislikeSchema:
 *      type: object
 *      properties:
 *        userId:
 *          type: string
 *        productId:
 *          type: string
 *        commentId:
 *          type: number
 */
/** Coupon Schema
 * @swagger
 * components:
 *  schemas:
 *    couponSchema:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        expiry:
 *          type: string
 *        discount:
 *          type: number
 */
/** Comment Schema
 * @swagger
 * components:
 *  schemas:
 *    commentSchema:
 *      type: object
 *      properties:
 *        productId:
 *          type: string
 *        writtenBy:
 *          type: string
 *        replyTo:
 *          type: string
 *        parentComment:
 *          type: string
 *        content:
 *          type: string
 */
/** Category Schema
 * @swagger
 * components:
 *  schemas:
 *    categorySchema:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        slug:
 *          type: string
 */
/** Cart Schema
 * @swagger
 * components:
 *  schemas:
 *    cartSchema:
 *      type: object
 *      properties:
 *        products:
 *          type: array
 *          items:
 *            type: object
 *            $ref: '#/components/schemas/cartProductItem'
 *        cartTotal:
 *          type: number
 *        totalAfterDiscount:
 *          type: number
 *          example: 0
 *        orderedBy:
 *          type: string
 */
/** User Schema
 * @swagger
 * components:
 *  schemas:
 *    userSchema:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        email:
 *          type: string
 *        role:
 *          type: string
 *        cart:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/productSchema'
 *        address:
 *          type: object
 *        wishlist:
 *          type: array
 *          items:
 *            type: string
 */
/** Sub Category Schema
 * @swagger
 * components:
 *  schemas:
 *    subCategorySchema:
 *      type: object
 *      required:
 *        - name
 *        - parentCategory
 *      properties:
 *        name:
 *          type: string
 *        slug:
 *          type: string
 *        parentCategory:
 *          type: string
 */
/** Product Schema
 * @swagger
 * components:
 *  schemas:
 *    productSchema:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        title:
 *          type: string
 *        slug:
 *          type: string
 *        description:
 *          type: string
 *        price:
 *          type: number
 *        category:
 *          type: string
 *        subCategory:
 *          type: array
 *          items:
 *            type: string
 *        quantity:
 *          type: number
 *        sold:
 *          type: number
 *        images:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              url:
 *                type: string
 *              public_id:
 *                type: string
 *        shipping:
 *          type: enum
 *          enum: [Yes, No]
 *        color:
 *          type: enum
 *          enum: [Black, Brown, Silver, White, Blue]
 *        brand:
 *          type: enum
 *          enum: [Apple, HP, Lenovo, Dell, Asus, Acer, MSI, Toshiba,]
 *        ratings:
 *          type: object
 *          properties:
 *            start:
 *              type: number
 *            postedBy:
 *              type: string
 */
/** Common Schemas
 * @swagger
 * components:
 *  schemas:
 *    paymentIntent:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        amount:
 *          type: number
 *        currency:
 *          type: string
 *        status:
 *          type: enum
 *          enum: [NOT PROCESSED, PROCESSING, DISPATCHED, CANCELED, COMPLETED, CASH ON DELIVERY]
 *        created:
 *          type: string
 *        payment_method_types:
 *          type: enum
 *          enum: [card, cod]
 *    cartProductItem:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        product:
 *          type: string
 *        count:
 *          type: number
 *        color:
 *          type: string
 *        price:
 *          type: number
 *    orderProductItem:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        product:
 *          type: string
 *        count:
 *          type: number
 *        color:
 *          type: string
 */
module.exports = router;
