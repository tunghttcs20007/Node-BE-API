const express = require('express');
const router = express.Router();

/** Import Middlewars Function */
const { authVerifyToken, verifyAdminRole } = require('../middlewares/auth');

/** Import Auth Controller */
const { createOrUpdateUser, getCurrentUser } = require('../controllers/auth');

/** Routes */
router.post('/create-or-update-user', authVerifyToken, createOrUpdateUser);
router.post('/current-user', authVerifyToken, getCurrentUser);
router.post('/current-admin', authVerifyToken, verifyAdminRole, getCurrentUser);

module.exports = router;
