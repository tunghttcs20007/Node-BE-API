const express = require('express');
const router = express.Router();

/** Import Middlewars Function - Auth Controller */
const { authVerifyToken, verifyAdminRole } = require('../middlewares/auth.middleware');

/** Import Category Controllers - CRUD */
const {
	createCategory,
	readCategory,
	updateCategory,
	deleteCategory,
	getAllCategories,
	getSubsByParent,
	getProductsByCategory,
} = require('../controllers/category.controller');

/** Routes */
router.post('/category', authVerifyToken, verifyAdminRole, createCategory);
router.get('/category/list-all', getAllCategories);
router.get('/category/:slug', readCategory);
router.get('/category/list-sub/:id', getSubsByParent);
router.get('/category/list-product/:id', getProductsByCategory);
router.put('/category/:slug', authVerifyToken, verifyAdminRole, updateCategory);
router.delete('/category/:slug', authVerifyToken, verifyAdminRole, deleteCategory);

module.exports = router;
