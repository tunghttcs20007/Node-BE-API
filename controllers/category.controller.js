const Category = require('../models/categorySchema');
const SubCategory = require('../models/subCategorySchema')
const Product = require('../models/productSchema')
const slugify = require('slugify');

exports.createCategory = async (req, res) => {
	const { name } = req.body;
	try {
		const isCategoryExist = await Category.findOne({ name }).exec();
		if (!isCategoryExist) {
			const category = await new Category({ name, slug: slugify(name) }).save();
			res.status(201).json(category);
		} else {
			res.status(409).send(`${name.toUpperCase()} is already existed!`)
		}
	} catch (error) {
		res.status(400).send(`Failed to create category: ${name.toUpperCase()}`);
	}
};

exports.readCategory = async (req, res) => {
	const { slug } = req.params;
	try {
		const category = await Category.findOne({ slug: req.params.slug }).exec();
		if (!category) {
			res.status(404).send(`${slug.toUpperCase()} not found`);
		} else {
			res.status(200).json(category);
		}
	} catch (error) {
		res.status(404).send('Category not found');
	}
};

exports.updateCategory = async (req, res) => {
	const { name } = req.body;
	const { slug } = req.params;
	try {
		const category = await Category.findOneAndUpdate({ slug }, { name, slug: slugify(name) }, { new: true }).exec()
		if (!category) {
			res.status(404).send(`${slug.toUpperCase()} not found`);
		} else {
			res.status(201).json(category);
		}
	} catch (error) {
		res.status(400).send('Failed to update category');
	}
};

exports.deleteCategory = async (req, res) => {
	const { slug } = req.params;
	try {
		const category = await Category.findOneAndDelete({ slug }).exec();
		if (category) {
			res.status(204).json(category);
		} else {
			res.status(404).send(`${slug.toUpperCase()} not found!`);
		}
	} catch (error) {
		res.status(400).send('Failed to delete category');
	}
};

exports.getAllCategories = async (req, res) => {
	res.json(await Category.find({}).sort({ createdAt: -1 }).exec()).status(200);
};

exports.getSubsByParent = async (req, res) => {
	const parentCategory = req.params.id;
	const subCategories = await SubCategory.find({ parentCategory }).exec();
	if (subCategories) {
		res.json(subCategories).status(200);
	} else {
		res.status(404).send('Can not found sub categories');
	}
};

exports.getProductsByCategory = async (req, res) => {
	const { id } = req.params;
	try {
		const category = await Category.findById(id).exec();
		const products = await Product.find({ category })
			.populate('category')
			.populate('subCategory')
			.populate('ratings.postedBy', 'name')
			.exec();
		
		res.json(products).status(200);
	} catch (error) {
		res.status(404).send('Can not found products');
	}
}