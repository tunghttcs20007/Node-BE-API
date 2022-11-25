const express = require('express');
const router = express.Router();

/** Import Middlewars Function - Auth Controller */
const { authVerifyToken, verifyAdminRole } = require('../middlewares/auth.middleware');

/** Import Sub Category Controllers - CRUD */
const { createCoupon, removeCoupon, getAllCoupons } = require('../controllers/coupon.controller');

/** Routes */
router.post('/coupon', authVerifyToken, verifyAdminRole, createCoupon);
router.get('/coupon/list', getAllCoupons);
router.delete('/coupon/:couponId', authVerifyToken, verifyAdminRole, removeCoupon);

module.exports = router;
