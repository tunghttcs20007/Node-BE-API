const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const dislikeSchema = new mongoose.Schema(
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

module.exports = mongoose.model('Dislike', dislikeSchema);
