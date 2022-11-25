const Order = require('../models/orderSchema');
const User = require('../models/userSchema');
const Cart = require('../models/cartSchema');
const Product = require('../models/productSchema');
const uniqid = require('uniqid');

exports.createOnlinePaymentOrder = async (req, res) => {
	const { paymentData } = req.body;
	const user = await User.findOne({ email: req.user.email });

	let { products } = await Cart.findOne({ orderedBy: user._id });

	await new Order({ products, paymentData, orderedBy: user._id }).save();

	//Decrement quantity and increment sold of product base on order
	let bulkProductOption = products.map((item) => {
		return {
			updateOne: {
				filter: { _id: item.product._id }, // IMPORTANT item.product
				update: { $inc: { quantity: -item.count, sold: +item.count } },
			},
		};
	});

	Product.bulkWrite(bulkProductOption, { new: true });

	res.json({ orderCreated: true }).status(200);
};

exports.createCODPaymentOrder = async (req, res) => {
	const { cod, coupon: isApplyCounpon } = req.body;
	const user = await User.findOne({ email: req.user.email });
	let userCart = await Cart.findOne({ orderedBy: user._id });

	if (!cod) {
		return res.send('Create Order With COD Payment Failed').status(400);
	}

	let finalAmount = 0;
	if (isApplyCounpon && userCart.totalAfterDiscount !== 0) {
		finalAmount = userCart.totalAfterDiscount * 100; //Convert amount current to cent
	} else {
		finalAmount = userCart.cartTotal * 100;
	}

	const paymentIntentId = uniqid('cod_', uniqid.time());
	await new Order({
		products: userCart.products,
		paymentData: {
			paymentIntent: {
				id: paymentIntentId,
				amount: finalAmount,
				currency: 'USD',
				status: 'Cash on delivery',
				created: Date.now(),
				payment_method_types: ['cash'],
			},
		},
		orderedBy: user._id,
		orderStatus: 'CASH ON DELIVERY',
	}).save();

	//Decrement quantity and increment sold of product base on order
	let bulkProductOption = userCart.products.map((item) => {
		return {
			updateOne: {
				filter: { _id: item.product._id }, // IMPORTANT item.product
				update: { $inc: { quantity: -item.count, sold: +item.count } },
			},
		};
	});

	Product.bulkWrite(bulkProductOption, { new: true });

	res.json({ orderCreated: true }).status(200);
};

exports.getAllOrders = async (req, res) => {
	const user = await User.findOne({ email: req.user.email });

	const userOrders = await Order.find({ orderedBy: user._id })
		.populate('products.product')
		.sort('-createdAt')
		.exec();

	res.json(userOrders).status(200);
};
