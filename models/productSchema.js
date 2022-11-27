const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			trim: true,
			require: true,
			maxlength: 32,
			text: true,
		},
		slug: {
			type: String,
			unique: true,
			lowercase: true,
			index: true,
		},
		description: {
			type: String,
			require: true,
			maxlength: 5000,
			text: true,
		},
		price: {
			type: Number,
			trim: true,
			require: true,
			maxlength: 32,
		},
		category: {
			type: ObjectId,
			ref: 'Category',
		},
		subCategory: [
			{
				type: ObjectId,
				ref: 'SubCategory',
			},
		],
		quantity: Number,
		sold: {
			type: Number,
			default: 0,
		},
		images: {
			type: Array,
		},
		shipping: {
			type: String,
			enum: ['Yes', 'No'],
		},
		color: {
			type: String,
			enum: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
		},
		brand: {
			type: String,
			enum: ['Apple', 'HP', 'Lenovo', 'Dell', 'Asus', 'Acer', 'MSI', 'Toshiba'],
		},
		ratings: [
			{
				star: Number,
				postedBy: {
					type: ObjectId,
					ref: 'User',
				},
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
