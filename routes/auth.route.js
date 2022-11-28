const express = require('express');
const router = express.Router();

/** Import Middlewars Function */
const { authVerifyToken, verifyAdminRole } = require('../middlewares/auth.middleware');

/** Import Auth Controller */
const { createOrUpdateUser, getCurrentUser } = require('../controllers/auth.controller');

/** Routes */

/**
 * @swagger
 * /accounts/:signInWithPassword?key:
 *  post:
 *    tags: [Auth]
 *    summary: Firebase login - Use the google apis to get access token (idToken in response)
 *    parameters:
 *      - in: query
 *        name: key
 *        description: Use this key in query parameter - AIzaSyBMFVbMiAFT-2gGJYycq3hONxTPXmg8txA
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      description: Email/Password to login via firebase
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/firebaseAuth'
 *    responses:
 *      200: 
 *        description: ok
 *        content: 
 *          application/json:
 *            schema:
 *              data:
 *                type: object
 */

/**
 * @swagger
 * /iam/user:
 *  post:
 *    tags: [Auth]
 *    summary: Login with Email/Password | Create new account with Email/Password
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
 *              $ref: '#/components/schemas/iamResponse'
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
router.post('/iam/user', authVerifyToken, createOrUpdateUser);

/**
 * @swagger
 * /iam/check-user:
 *  post:
 *    tags: [Auth]
 *    summary: Login with Email/Password | Create new account with Email/Password
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
 *              $ref: '#/components/schemas/iamResponse'
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
router.post('/iam/check-user', authVerifyToken, getCurrentUser);

/**
 * @swagger
 * /iam/check-admin:
 *  post:
 *    tags: [Auth]
 *    summary: Login with Email/Password | Create new account with Email/Password
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
 *              $ref: '#/components/schemas/iamResponse'
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
router.post('/iam/check-admin', authVerifyToken, verifyAdminRole, getCurrentUser);

module.exports = router;
