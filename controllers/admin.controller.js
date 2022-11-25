const Order = require('../models/orderSchema');
const User = require('../models/userSchema');

exports.getAllOrders = async (req, res) => {
	let allOrders = await Order.find({}).sort('-createdAt').populate('products.product').exec();

	res.json(allOrders).status(200);
};

exports.updateOrderStatus = async (req, res) => {
	const { orderId, orderStatus } = req.body;

	let updatedOrder = await Order.findByIdAndUpdate(orderId, { orderStatus }, { new: true }).exec();

	const { name } = await User.findById(updatedOrder.orderedBy);

	res.json({ updated: true, customer: name }).status(200);
};
