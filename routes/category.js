const express = require('express');
const router = express.Router();

/** Import Middlewars Function - Auth Controller */
const { authVerifyToken, verifyAdminRole } = require('../middlewares/auth');

/** Import Category Controllers - CRUD */
const {
	createCategory,
	readCategory,
	updateCategory,
	deleteCategory,
	getAllCategories,
	getSubsByParent,
	getProductsByCategory,
} = require('../controllers/category');

/** Routes */
router.post('/category', authVerifyToken, verifyAdminRole, createCategory);
router.get('/categories', getAllCategories);
router.get('/category/:slug', readCategory);
router.get('/category/sub-catogories/:id', getSubsByParent);
router.get('/category/products/:id', getProductsByCategory);
router.put('/category/:slug', authVerifyToken, verifyAdminRole, updateCategory);
router.delete('/category/:slug', authVerifyToken, verifyAdminRole, deleteCategory);

module.exports = router;
