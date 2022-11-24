const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const commentSchema = new mongoose.Schema(
	{
		productId: {
			type: ObjectId,
			ref: 'Product',
		},
		writtenBy: {
			type: ObjectId,
			ref: 'User',
		},
		replyTo: {
			type: ObjectId,
			ref: 'User',
		},
		content: {
			type: string,
			require: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
