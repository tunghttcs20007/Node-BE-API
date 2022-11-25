const User = require('../models/userSchema');
const Cart = require('../models/cartSchema');
const Product = require('../models/productSchema');
const Coupon = require('../models/couponSchema');

exports.userCheckout = async (req, res) => {
	const { cart } = req.body;
	let products = [];
	const user = await User.findOne({ email: req.user.email }).exec();

	let isUserCartExisted = await Cart.findOne({ orderedBy: user._id });
	if (isUserCartExisted) {
		isUserCartExisted.remove();
	}

	for (let i = 0; i < cart.length; i++) {
		let itemObj = {};
		itemObj.product = cart[i]._id;
		itemObj.count = cart[i].count;
		itemObj.color = cart[i].color;
		//get product price thru backend
		let { price } = await Product.findById(cart[i]._id).select('price').exec();
		itemObj.price = price;

		products.push(itemObj);
	}

	let cartTotal = 0;
	for (let i = 0; i < products.length; i++) {
		cartTotal = cartTotal + products[i].price * products[i].count;
	}

	let newCart = await new Cart({
		products,
		cartTotal,
		orderedBy: user._id,
	}).save();

	res.json({ newCart, success: true }).status(201);
};

exports.getUserCart = async (req, res) => {
	const user = await User.findOne({ email: req.user.email }).exec();

	let cart = await Cart.findOne({ orderedBy: user._id })
		.populate('products.product', '_id title price')
		.exec();

	const { products, cartTotal, totalAfterDiscount } = cart;
	res.json({ products, cartTotal, totalAfterDiscount }).status(200);
};

exports.emptyCart = async (req, res) => {
	const user = await User.findOne({ email: req.user.email }).exec();

	await Cart.findOneAndRemove({ orderedBy: user._id }).exec();

	res.json({ success: true }).status(204);
};

exports.updateAddress = async (req, res) => {
	const user = await User.findOneAndUpdate(
		{ email: req.user.email },
		{ address: req.body.address },
		{ useFindAndModify: false, new: true }
	).exec();

	res.json({ user, success: true }).status(201);
};

exports.applyCoupon = async (req, res) => {
	const { coupon } = req.body;

	const isCouponValid = await Coupon.findOne({ name: coupon }).exec();
	if (isCouponValid == null) {
		return res.json({ error: 'Invalid coupon' }).status(404);
	}
	const expiryDate = new Date(isCouponValid.expiry);
	const currentDate = new Date();
	if (expiryDate < currentDate) {
		return res.json({ error: 'Coupon is expired' }).status(403);
	}

	const user = await User.findOne({ email: req.user.email }).exec();

	let { cartTotal } = await Cart.findOne({ orderedBy: user._id })
		.populate('products.product', '_id title price')
		.exec();

	let totalAfterDiscount = (cartTotal - (cartTotal * isCouponValid.discount) / 100).toFixed(2);

	await Cart.findOneAndUpdate(
		{ orderedBy: user._id },
		{ totalAfterDiscount },
		{ new: true, useFindAndModify: FinalizationRegistry }
	).exec();

	res
		.json({
			discountPrice: totalAfterDiscount,
			discount: isCouponValid.discount,
			success: true,
		})
		.status(200);
};

exports.addProductToWishList = async (req, res) => {
	const { productId } = req.body;

	await User.findOneAndUpdate(
		{ email: req.user.email },
		{ $addToSet: { wishlist: productId } },
	).exec();

	res.json({ success: true }).status(201);
};

exports.getUserWishList = async (req, res) => {
	const wishlist = await User.findOne({ email: req.user.email })
		.select('wishlist')
		.populate('wishlist')
		.exec();

	res.json(wishlist).status(200);
};

exports.removeProductFromWishList = async (req, res) => {
	const { productId } = req.params;
	await User.findOneAndUpdate(
		{ email: req.user.email },
		{ $pull: { wishlist: productId } },
	).exec();

	res.json({ success: true }).status(204);
};
