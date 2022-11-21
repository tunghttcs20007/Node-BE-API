const express = require('express');
const router = express.Router();

/** Import Middlewars Function - Auth Controller */
const { authVerifyToken, verifyAdminRole } = require('../middlewares/auth');

/** Import Sub Category Controllers - CRUD */
const {
	createSubCategory,
	readSubCategory,
	updateSubCategory,
	deleteSubCategory,
	getAllSubCategories,
	getProductsBySub,
} = require('../controllers/sub');

/** Routes */
router.post('/sub-category', authVerifyToken, verifyAdminRole, createSubCategory);
router.get('/sub-categories', getAllSubCategories);
router.get('/sub-category/:slug', readSubCategory);
router.get('/sub-category/products/:id', getProductsBySub);
router.put('/sub-category/:slug', authVerifyToken, verifyAdminRole, updateSubCategory);
router.delete('/sub-category/:slug', authVerifyToken, verifyAdminRole, deleteSubCategory);

module.exports = router;