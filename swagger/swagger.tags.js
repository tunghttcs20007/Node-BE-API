const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *  - name: Auth
 *    description: |
 *      **The 3 /iam endpoints are used to identify the user account only after that user logged in via firebase and successfully get the idToken**.
 *      *Remeber to get the idToken from firebase first and provide it in the header for testing purpose*
 *  - name: Admin
 *    description: Admin endpoints
 *  - name: Category
 *    description: Category endpoints
 *  - name: Comment
 *    description: Comment endpoints
 *  - name: Coupon
 *    description: Coupon endpoints
 *  - name: Order
 *    description: Order endpoints
 *  - name: Product
 *    description: Product endpoints
 *  - name: Payment
 *    description: Payment endpoints
 *  - name: SubCategory
 *    description: SubCategory endpoints
 *  - name: User
 *    description: User endpoints
 */

module.exports = router;
