const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
	{
		products: [
			{
				product: {
					type: ObjectId,
					ref: 'Product',
				},
				count: Number,
				color: String,
			},
		],
		paymentData: {},
		orderStatus: {
			type: String,
			default: 'NOT PROCESSED',
			enum: [
				'NOT PROCESSED',
				'PROCESSING',
				'DISPATCHED',
				'CANCELED',
				'COMPLETED',
				'CASH ON DELIVERY',
			],
		},
		orderedBy: {
			type: ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
