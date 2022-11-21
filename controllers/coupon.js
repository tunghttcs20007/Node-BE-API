const Coupon = require('../models/couponSchema');

exports.createCoupon = async (req, res) => {
	try {
		const { name, expiry, discount } = req.body.coupon;
		const coupon = await new Coupon({ name, expiry, discount }).save();
		res.json({ coupon }).status(201);
	} catch (err) {
		res.json(err).status(400);
	}
};

exports.removeCoupon = async (req, res) => {
	try {
		await Coupon.findByIdAndDelete(req.params.couponId).exec();
		res.json({ deleted: true }).status(204);
	} catch (err) {
		console.log({ err });
	}
};

exports.getAllCoupons = async (req, res) => {
	try {
		const coupons = await Coupon.find({}).sort({ createdAt: -1 }).exec();
		res.json(coupons).status(200);
	} catch (err) {
		console.log(err);
	}
};
