const express = require('express');
const router = express.Router();

/** Import Middlewars Function - Auth Controller */
const { authVerifyToken } = require('../middlewares/auth.middleware');

/** Import User Controllers - CRUD */
const {
	userCheckout,
	getUserCart,
	emptyCart,
	updateAddress,
	applyCoupon,
	addProductToWishList,
	getUserWishList,
	removeProductFromWishList,
} = require('../controllers/user.controller');

/** 
 * @swagger
 * /user/checkout:
 *  post:
 *    tags: [User]
 *    summary: User checkout
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/cartSchema'
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
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/createCategoryResponse'
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
router.post('/user/checkout', authVerifyToken, userCheckout);

/** 
 * @swagger
 * /user/cart:
 *  post:
 *    tags: [User]
 *    summary: Create new cart
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/cartSchema'
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
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/createCategoryResponse'
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
router.post('/user/cart', authVerifyToken, userCheckout);

/** 
 * @swagger
 * /user/cart/address:
 *  post:
 *    tags: [User]
 *    summary: Update user address
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/updateUserAddressPayload'
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
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/userSchema'
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
router.post('/user/cart/address', authVerifyToken, updateAddress);

/** 
 * @swagger
 * /user/coupon:
 *  post:
 *    tags: [User]
 *    summary: Apply coupon
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/applyCouponPayload'
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
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/applyCouponResponse'
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
router.post('/user/coupon', authVerifyToken, applyCoupon);

/** 
 * @swagger
 * /user/wishlist:
 *  post:
 *    tags: [User]
 *    summary: Add product to wishlist
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/addProductWishlistPayload'
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
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/addProductWishListResponse'
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
router.post('/user/wishlist', authVerifyToken, addProductToWishList);

/**
 * @swagger
 * /user/cart:
 *  get:
 *    tags: [User]
 *    summary: Get current logged-in user cart
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
router.get('/user/cart', authVerifyToken, getUserCart);

/**
 * @swagger
 * /user/wishlist:
 *  get:
 *    tags: [User]
 *    summary: Get all categories
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
router.get('/user/wishlist', authVerifyToken, getUserWishList);

/**
 * @swagger
 * /user/wishlist/{productId}:
 *  put:
 *    tags: [User]
 *    summary: Remove product from wishlist
 *    parameters:
 *      - in: header
 *        name: accessToken
 *        description: user access token
 *        schema:
 *          type: string
 *          required: true
 *      - in: path
 *        name: productId
 *        description: productId
 *        schema:
 *          type: string
 *          required: true
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
router.put('/user/wishlist/:productId', authVerifyToken, removeProductFromWishList);

/**
 * @swagger
 * /user/cart:
 *  delete:
 *    tags: [User]
 *    summary: Delete user cart
 *    parameters:
 *      - in: header
 *        name: accessToken
 *        description: user access token
 *        schema:
 *          type: string
 *          required: true
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
router.delete('/user/cart', authVerifyToken, emptyCart);

module.exports = router;
