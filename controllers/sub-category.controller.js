const SubCategory = require('../models/subCategorySchema');
const Product = require('../models/productSchema')
const slugify = require('slugify');

exports.createSubCategory = async (req, res) => {
	const { name, categoryId: parentCategory } = req.body;
	try {
		const isSubExist = await SubCategory.findOne({ name }).exec();
		if (!isSubExist) {
			const subCategory = await new SubCategory({
				name,
				parentCategory,
				slug: slugify(name),
			}).save();
			res.status(201).json(subCategory);
		} else {
			res.status(409).send(`${name.toUpperCase()} is already existed!`);
		}
	} catch (error) {
		res.status(400).send(`Failed to create sub category ${name.toUpperCase()}`);
	}
};

exports.readSubCategory = async (req, res) => {
	const { slug } = req.params;
	try {
		const subCategory = await SubCategory.findOne({ slug: req.params.slug }).exec();
		if (!subCategory) {
			res.status(404).send(`${slug.toUpperCase()} not found`);
		} else {
			res.status(200).json(subCategory);
		}
	} catch (error) {
		res.status(400).send('Failed to read sub category');
	}
};

exports.updateSubCategory = async (req, res) => {
	const { name, categoryId: parentCategory } = req.body;
	const { slug } = req.params;
	try {
		const subCategory = await SubCategory.findOneAndUpdate(
			{ slug },
			{ name, slug: slugify(name), parentCategory },
			{ new: true }
		).exec();
		if (!subCategory) {
			res.status(404).send(`${slug.toUpperCase()} not found`);
		} else {
			res.status(201).json(subCategory);
		}
	} catch (error) {
		res.status(400).send('Failed to update category');
	}
};

exports.deleteSubCategory = async (req, res) => {
	const { slug } = req.params;
	try {
		const subCategory = await SubCategory.findOneAndDelete({ slug }).exec();
		if (subCategory) {
			res.status(204).json(subCategory);
		} else {
			res.status(404).send(`${slug.toUpperCase()} not found!`);
		}
	} catch (error) {
		res.status(400).send(`Failed to delete sub category ${slug.toUpperCase()}`);
	}
};

exports.getAllSubCategories = async (req, res) => {
	res.json(await SubCategory.find({}).sort({ createdAt: -1 }).exec()).status(200);
};

exports.getProductsBySub = async (req, res) => {
	const { id } = req.params;
	try {
		const subCategory = await SubCategory.findById(id).exec();
		const productsList = await Product.find({ subCategory })
			.populate('category')
			.populate('subCategory')
			.populate('ratings.postedBy', 'name')
			.exec();
		
		res.json(productsList).status(200);
	} catch (error) {
		res.status(404).send(`Can not find products with subCategoryId: ${id}`);
	}
}
