const express = require('express');
const router = express.Router();

/** Import Middlewars Function - Auth Controller */
const { authVerifyToken, verifyAdminRole } = require('../middlewares/auth.middleware');

/** Import Sub Category Controllers - CRUD */
const {
	createOnlinePaymentOrder,
	getAllOrders,
	createCODPaymentOrder,
} = require('../controllers/order.controller');

/** Routes */
router.post('/order/online', authVerifyToken, createOnlinePaymentOrder);
router.post('/order/cod', authVerifyToken, createCODPaymentOrder);
router.get('/order/list-all', authVerifyToken, getAllOrders);

module.exports = router;
