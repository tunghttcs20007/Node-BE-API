const express = require('express');
const router = express.Router();

/** Import Middlewars Function */
const { authVerifyToken, verifyAdminRole } = require('../middlewares/auth');

/** Import Auth Controller */
const { createOrUpdateUser, getCurrentUser } = require('../controllers/auth');

/** Routes */
router.post('/iam/user', authVerifyToken, createOrUpdateUser);
router.post('/iam/check-user', authVerifyToken, getCurrentUser);
router.post('/iam/check-admin', authVerifyToken, verifyAdminRole, getCurrentUser);

module.exports = router;
