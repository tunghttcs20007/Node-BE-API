const express = require('express');
const router = express.Router();

/** Import Middlewars Function - Auth Controller */
const { authVerifyToken } = require('../middlewares/auth.middleware');

/** Import User Controllers - CRUD */
const {
	userCheckout,
	getUserCart,
	emptyCart,
	updateAddress,
	applyCoupon,
	addProductToWishList,
	getUserWishList,
	removeProductFromWishList,
} = require('../controllers/user.controller');

router.post('/user/checkout', authVerifyToken, userCheckout);
router.post('/user/cart', authVerifyToken, userCheckout);
router.post('/user/cart/address', authVerifyToken, updateAddress);
router.post('/user/coupon', authVerifyToken, applyCoupon);
router.post('/user/wishlist', authVerifyToken, addProductToWishList);
router.get('/user/cart', authVerifyToken, getUserCart);
router.get('/user/wishlist', authVerifyToken, getUserWishList);
router.put('/user/wishlist/:productId', authVerifyToken, removeProductFromWishList);
router.delete('/user/cart', authVerifyToken, emptyCart);

module.exports = router;
