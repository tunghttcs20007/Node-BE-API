const express = require('express');
const router = express.Router();

/** Import Middlewars Function - Auth Controller */
const { authVerifyToken, verifyAdminRole } = require('../middlewares/auth');

/** Import User Controllers - CRUD */
const {getAllOrders, updateOrderStatus} = require('../controllers/admin');

router.get('/admin/orders', authVerifyToken, verifyAdminRole, getAllOrders);
router.put('/admin/order', authVerifyToken, verifyAdminRole, updateOrderStatus);

module.exports = router;
