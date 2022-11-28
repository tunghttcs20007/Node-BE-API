const express = require('express');
const router = express.Router();

/** Import Middlewars Function - Auth Controller */
const { authVerifyToken } = require('../middlewares/auth.middleware');

/** Import Product Controllers - CRUD */
const {
	saveProductCommnet,
	getAllProductComments,
	updateProductComment,
	deleteProductComment,
	addLikeComment,
	removeLikeComment,
	getCommentLikeCount,
	addDislikeComment,
	removeDislikeComment,
	getCommentDislikeCount,
} = require('../controllers/comment.controller');

/** Routes */

/**
 * @swagger
 * /comment/save-comment:
 *  post:
 *    tags: [Comment]
 *    summary: Create new comment
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/createCommentPayload'
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
router.post('/comment/save-comment', authVerifyToken, saveProductCommnet);

/**
 * @swagger
 * /comment/{productId}/list-all:
 *  get:
 *    tags: [Comment]
 *    summary: Get all product comments
 *    parameters:
 *      - in: path
 *        name: productId
 *        schema:
 *          type: string
 *          required: true
 *          description: product id
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
router.get('/comment/:productId/list-all', getAllProductComments);

/**
 * @swagger
 * /comment/{commentId}/update-comment:
 *  put:
 *    tags: [Comment]
 *    summary: Update comment
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/updateCommentPayload'
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
router.put('/comment/:commentId/update-comment', authVerifyToken, updateProductComment);

/**
 * @swagger
 * /comment/{commentId}/remove-comment:
 *  delete:
 *    tags: [Comment]
 *    summary: Delete comment
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
router.delete('/comment/:commentId/remove-comment', authVerifyToken, deleteProductComment);

//Like, Dislike
/**
 * @swagger
 * /comment/like/{commentId}:
 *  post:
 *    tags: [Comment]
 *    summary: Like comment
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/addCmtLikeBody'
 *    parameters:
 *      - in: header
 *        name: accessToken
 *        description: user access token
 *        schema:
 *          type: string
 *          required: true
 *      - in: path
 *        name: commentId
 *        schema:
 *          type: string
 *          required: true
 *          description: product commentId
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
router.post('/comment/like/:commentId', authVerifyToken, addLikeComment);

/**
 * @swagger
 * /comment/like/{commentId}:
 *  delete:
 *    tags: [Comment]
 *    summary: Remove like
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/addCmtLikeBody'
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
router.delete('/comment/:userId/like/:commentId', authVerifyToken, addDislikeComment);

/**
 * @swagger
 * /comment/like/{commentId}:
 *  get:
 *    tags: [Comment]
 *    summary: Get all comments likes and likes count
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
router.get('/comment/like/:commentId', getCommentLikeCount);

/**
 * @swagger
 * /comment/dislike/{commentId}:
 *  post:
 *    tags: [Comment]
 *    summary: Comment dislike
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/addCmtLikeBody'
 *    parameters:
 *      - in: header
 *        name: accessToken
 *        description: user access token
 *        schema:
 *          type: string
 *          required: true
 *      - in: path
 *        name: commentId
 *        schema:
 *          type: string
 *          required: true
 *          description: product commentId
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
router.post('/comment/dislike/:commentId', authVerifyToken, removeLikeComment);

/**
 * @swagger
 * /comment/dislike/{commentId}:
 *  get:
 *    tags: [Comment]
 *    summary: Get all comments dislikes and likes count
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
router.get('/comment/dislike/:commentId', getCommentDislikeCount);

/**
 * @swagger
 * /comment/dislike/{commentId}:
 *  delete:
 *    tags: [Comment]
 *    summary: Remove dislike
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/addCmtLikeBody'
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
router.delete('/comment/:userId/dislike/:commentId', authVerifyToken, removeDislikeComment);

module.exports = router;
