const express = require('express');
const router = express.Router();

/** Import Middlewars Function - Auth Controller */
const { authVerifyToken, verifyAdminRole } = require('../middlewares/auth');

/** Import Sub Category Controllers - CRUD */
const {
	createOnlinePaymentOrder,
	getAllOrders,
	createCODPaymentOrder,
} = require('../controllers/order');

/** Routes */
router.post('/order/create', authVerifyToken, createOnlinePaymentOrder);
router.post('/order/create/cash-order', authVerifyToken, createCODPaymentOrder);
router.get('/order/listAll', authVerifyToken, getAllOrders);

module.exports = router;
