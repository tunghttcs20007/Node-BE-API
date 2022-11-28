const express = require('express');
const router = express.Router();

/** Import Middlewars Function - Auth Controller */
const { authVerifyToken, verifyAdminRole } = require('../middlewares/auth.middleware');

/** Import Sub Category Controllers - CRUD */
const {
	createSubCategory,
	readSubCategory,
	updateSubCategory,
	deleteSubCategory,
	getAllSubCategories,
	getProductsBySub,
} = require('../controllers/sub-category.controller');

/** Routes */

/**
 * @swagger
 * /sub-category:
 *  post:
 *    tags: [SubCategory]
 *    summary: Create new sub-category
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/createSubCategoryPayload'
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
router.post('/sub-category', authVerifyToken, verifyAdminRole, createSubCategory);

/**
 * @swagger
 * /sub-category/list-all:
 *  get:
 *    tags: [SubCategory]
 *    summary: Get all sub-categories
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
router.get('/sub-category/list-all', getAllSubCategories);

/**
 * @swagger
 * /sub-category/{id}:
 *  get:
 *    tags: [SubCategory]
 *    summary: Get sub-category by id
 *    parameters:
 *      - in: path
 *        name: id
 *        description: subcategoryId
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
router.get('/sub-category/:id', readSubCategory);

/**
 * @swagger
 * /sub-category/list-product/{id}:
 *  get:
 *    tags: [SubCategory]
 *    summary: Get all products of the sub-category
 *    parameters:
 *      - in: path
 *        name: id
 *        description: subcategoryId
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
router.get('/sub-category/list-product/:id', getProductsBySub);

/**
 * @swagger
 * /sub-category/{slug}:
 *  put:
 *    tags: [SubCategory]
 *    summary: Update subcategory
 *    parameters:
 *      - in: header
 *        name: accessToken
 *        description: admin access token
 *        schema:
 *          type: string
 *          required: true
 *      - in: path
 *        name: slug
 *        description: subcategory slug
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
router.put('/sub-category/:slug', authVerifyToken, verifyAdminRole, updateSubCategory);

/**
 * @swagger
 * /sub-category/{slug}:
 *  delete:
 *    tags: [SubCategory]
 *    summary: Remove subcategory
 *    parameters:
 *      - in: header
 *        name: accessToken
 *        description: admin access token
 *        schema:
 *          type: string
 *          required: true
 *      - in: path
 *        name: slug
 *        description: subcategory slug
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
router.delete('/sub-category/:slug', authVerifyToken, verifyAdminRole, deleteSubCategory);

module.exports = router;
