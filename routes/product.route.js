const express = require('express');
const router = express.Router();

/** Import Middlewars Function - Auth Controller */
const { authVerifyToken, verifyAdminRole } = require('../middlewares/auth.middleware');

/** Import Product Controllers - CRUD */
const {
	createProduct,
	getAllProducts,
	removeProduct,
	updateProduct,
	getProduct,
	getProductsAndSort,
	getPoductsCount,
	updateProductRating,
	getAllRelated,
	searchFilters,
} = require('../controllers/product.controller');

/** Routes */
router.post('/product', authVerifyToken, verifyAdminRole, createProduct);
router.post('/product/search', searchFilters);
router.post('/product/list/sort', getProductsAndSort);
router.get('/product/count', getPoductsCount);
router.get('/product/list-all', getAllProducts);
router.get('/product/:slug', getProduct);
router.get('/product/related/:productId/:limit', getAllRelated);
router.put('/product/:slug', authVerifyToken, verifyAdminRole, updateProduct);
router.put('/product/rating/:productId', authVerifyToken, updateProductRating);
router.delete('/product/:slug', authVerifyToken, verifyAdminRole, removeProduct);

module.exports = router;
