const express = require('express');
const router = express.Router();

/** Import Middlewars Function - Auth Controller */
const { authVerifyToken, verifyAdminRole } = require('../middlewares/auth');

/** Import Product Controllers - CRUD */
const {uploadImages, removeImages} = require('../controllers/cloudinary')

/** Routes */
router.post('/images', authVerifyToken, verifyAdminRole, uploadImages);
router.post('/images/remove', authVerifyToken, verifyAdminRole, removeImages);

module.exports = router;