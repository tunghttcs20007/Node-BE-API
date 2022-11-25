const express = require('express');
const router = express.Router();

/** Import Middlewars Function - Auth Controller */
const { authVerifyToken, verifyAdminRole } = require('../middlewares/auth.middleware');

/** Import Product Controllers - CRUD */
const { uploadImages, removeImages } = require('../controllers/cloudinary.controller');

/** Routes */
router.post('/image/upload', authVerifyToken, verifyAdminRole, uploadImages);
router.post('/image/remove', authVerifyToken, verifyAdminRole, removeImages);

module.exports = router;
