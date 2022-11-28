const express = require('express');
const router = express.Router();

/** Import Middlewars Function - Auth Controller */
const { authVerifyToken, verifyAdminRole } = require('../middlewares/auth.middleware');

/** Import Category Controllers - CRUD */
const {
	createCategory,
	readCategory,
	updateCategory,
	deleteCategory,
	getAllCategories,
	getSubsByParent,
	getProductsByCategory,
} = require('../controllers/category.controller');

/** Routes */

/**
 * @swagger
 * /category:
 *  post:
 *    tags: [Category]
 *    summary: Create new category
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/createCategoryPayload'
 *          example:
 *            name: string
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
router.post('/category', authVerifyToken, verifyAdminRole, createCategory);

/**
 * @swagger
 * /category/list-all:
 *  get:
 *    tags: [Category]
 *    summary: Get all categories
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
router.get('/category/list-all', getAllCategories);

/**
 * @swagger
 * /category/{slug}:
 *  get:
 *    tags: [Category]
 *    summary: Get a Category
 *    parameters:
 *      - in: path
 *        name: slug
 *        schema:
 *          type: string
 *          required: true
 *          description: product slug
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
router.get('/category/:slug', readCategory);

/**
 * @swagger
 * /category/list-sub/{id}:
 *  get:
 *    tags: [Category]
 *    summary: Get a Category
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: productId
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
router.get('/category/list-sub/:id', getSubsByParent);

/**
 * @swagger
 * /category/list-product/{id}:
 *  get:
 *    tags: [Category]
 *    summary: Get all products of the category
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: productId
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
router.get('/category/list-product/:id', getProductsByCategory);

/**
 * @swagger
 * /category:
 *  put:
 *    tags: [Category]
 *    summary: Update category name
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/createCategoryPayload'
 *          example:
 *            name: string
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
router.put('/category/:slug', authVerifyToken, verifyAdminRole, updateCategory);

/**
 * @swagger
 * /category:
 *  delete:
 *    tags: [Category]
 *    summary: Delete category
 *    parameters:
 *      - in: header
 *        name: accessToken
 *        description: admin access token
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
router.delete('/category/:slug', authVerifyToken, verifyAdminRole, deleteCategory);

module.exports = router;
