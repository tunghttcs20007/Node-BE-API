const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const likeSchema = new mongoose.Schema(
	{
		userId: {
			type: ObjectId,
			ref: 'User',
		},
		productId: {
			type: Object,
			ref: 'Product',
		},
		commentId: {
			type: ObjectId,
			ref: 'Comment',
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Like', likeSchema);
