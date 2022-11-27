const User = require('../models/userSchema');
const Cart = require('../models/cartSchema');
const stripe = require('stripe')(process.env.STRIPE_SK);

exports.createPaymentIntent = async (req, res) => {
	//TODO: Apply Coupon, calculate price
	const { isApplyCounpon } = req.body;

	const user = await User.findOne({ email: req.user.email }).exec();
	const cart = await Cart.findOne({ orderedBy: user._id }).exec();
	const { cartTotal, totalAfterDiscount } = cart;

	//Request charge to stripe
	let finalAmount = 0;
	if (isApplyCounpon && totalAfterDiscount !== 0) {
		finalAmount = totalAfterDiscount * 100; //Convert amount current to cent
	} else {
		finalAmount = cartTotal * 100;
	}
	
	const paymentIntent = await stripe.paymentIntents.create({
		amount: finalAmount,
		currency: 'USD',
	});

	res
		.send({
			clientSecret: paymentIntent.client_secret,
			totalAfterDiscount,
			cartTotal,
			payable: finalAmount,
		})
		.status(201);
};
