const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const couponSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			unique: true,
			uppercase: true,
			required: 'Require name for coupon',
			minlength: [4, 'Name is too short'],
			maxlength: [12, 'Name is too long'],
		},
		expiry: {
			type: Date,
			required: true,
			min: [new Date(), 'Expiry must greater than today'],
		},
		discount: {
			type: Number,
			requred: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Coupon', couponSchema);
