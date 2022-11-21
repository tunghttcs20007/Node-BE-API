const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const subCategorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: 'Required Category Name',
			minlength: [4, 'Name is too short'],
			maxlength: [32, 'Name is too long'],
		},
		slug: {
			type: String,
			unique: true,
			lowercase: true,
			index: true,
		},
		parentCategory: {
			type: ObjectId,
			ref: 'Category',
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('SubCategory', subCategorySchema);
