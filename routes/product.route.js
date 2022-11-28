const express = require('express');
const router = express.Router();

/** Import Middlewars Function - Auth Controller */
const { authVerifyToken, verifyAdminRole } = require('../middlewares/auth.middleware');

/** Import Product Controllers - CRUD */
const {
	createProduct,
	getAllProducts,
	removeProduct,
	updateProduct,
	getProduct,
	getProductsAndSort,
	getPoductsCount,
	updateProductRating,
	getAllRelated,
	searchFilters,
} = require('../controllers/product.controller');

/** Routes */

/**
 * @swagger
 * /product:
 *  post:
 *    tags: [Product]
 *    summary: Create new product
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/productSchema'
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
 *              $ref: '#/components/schemas/productSchema'
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
router.post('/product', authVerifyToken, verifyAdminRole, createProduct);

/**
 * @swagger
 * /product/search:
 *  post:
 *    tags: [Product]
 *    summary: Filter products
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/searchQuery'
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
 *              $ref: '#/components/schemas/productSchema'
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
router.post('/product/search', searchFilters);

/**
 * @swagger
 * /product/list/sort:
 *  post:
 *    tags: [Product]
 *    summary: Get sorted products
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/getProductsSortedList'
 *    responses: 
 *      200:
 *        description: ok
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/productSchema'
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
router.post('/product/list/sort', getProductsAndSort);

/**
 * @swagger
 * /product/count:
 *  get:
 *    tags: [Product]
 *    summary: Get sorted products
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
router.get('/product/count', getPoductsCount);

/**
 * @swagger
 * /product/list-all:
 *  get:
 *    tags: [Product]
 *    summary: Get all products
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
router.get('/product/list-all', getAllProducts);

/**
 * @swagger
 * /product/{slug}:
 *  get:
 *    tags: [Product]
 *    summary: Get product by slug
 *    parameters:
 *      - in: path
 *        name: slug
 *        description: product slug
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
router.get('/product/:slug', getProduct);

/**
 * @swagger
 * /product/related/{productId}/{limit}:
 *  get:
 *    tags: [Product]
 *    summary: Get related product
 *    parameters:
 *      - in: path
 *        name: productId
 *        description: productId
 *        schema:
 *          type: string
 *          required: true
 *      - in: path
 *        name: limit
 *        description: limit
 *        schema:
 *          type: number
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
router.get('/product/related/:productId/:limit', getAllRelated);

/**
 * @swagger
 * /product/{slug}:
 *  put:
 *    tags: [Product]
 *    summary: Update product details
 *    parameters:
 *      - in: header
 *        name: accessToken
 *        description: admin access token
 *        schema:
 *          type: string
 *          required: true
 *      - in: path
 *        name: slug
 *        description: product slug
 *        schema:
 *          type: string
 *          required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/productSchema'
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
router.put('/product/:slug', authVerifyToken, verifyAdminRole, updateProduct);

/**
 * @swagger
 * /product/rating/{productId}:
 *  put:
 *    tags: [Product]
 *    summary: Update product details
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
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/productSchema'
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
router.put('/product/rating/:productId', authVerifyToken, updateProductRating);

/**
 * @swagger
 * /product/{slug}:
 *  delete:
 *    tags: [Product]
 *    summary: Update product details
 *    parameters:
 *      - in: header
 *        name: accessToken
 *        description: admin access token
 *        schema:
 *          type: string
 *          required: true
 *      - in: path
 *        name: slug
 *        description: product slug
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
router.delete('/product/:slug', authVerifyToken, verifyAdminRole, removeProduct);

module.exports = router;
