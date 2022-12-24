const Product = require('../models/productSchema');
const User = require('../models/userSchema');
const slugify = require('slugify');

exports.createProduct = async (req, res) => {
	const { title } = req.body;
	const slug = slugify(title);
	try {
		const isProductExist = await Product.findOne({ slug }).exec();
    if (isProductExist) {
      res.status(409).send(`${title.toUpperCase()} is already existed!`);
    } else {
			req.body.slug = slug;
			const product = await new Product(req.body).save();
			res.status(201).json(product);
		}
  } catch (error) {
		res.status(400).send(`Failed to create product ${title}`);
	}
};

exports.getAllProducts = async (req, res) => {
	const products = await Product.find({})
		.populate('category')
		.populate('subCategory')
		.sort([['createdAt', 'desc']])
		.exec();

	res.json(products).status(200);
};

exports.getProduct = async (req, res) => {
	const slug = req.params.slug;
	const product = await Product.findOne({ slug })
		.populate('category')
		.populate('subCategory')
		.exec();
	
	res.json(product);
}

exports.updateProduct = async (req, res) => {
	const slug = req.params.slug;
	try {
		if (req.body.title) {
			req.body.slug = slugify(req.body.title);
		}
		const updatedProduct = await Product.findOneAndUpdate({ slug }, req.body, {
			useFindAndModify: false,
			new: true,
		}).exec();

		res.json(updatedProduct);
	} catch (error) {
		console.log(error);
		res.status(400).send(`Failed to update ${req.body.title}`)
	}
}

exports.removeProduct = async (req, res) => {
	const slug = req.params.slug;
	try {
		const deletedProduct = await Product.findOneAndRemove({ slug }, {useFindAndModify: false}).exec();
		res.json(deletedProduct).status(204);
	} catch (error) {
		res.status(400).send(`Failed to delete product ${slug.toUpperCase()}`);
	}
};

exports.getProductsAndSort = async (req, res) => {
	try {
		const { sort, order, page, limit } = req.body;
		const currentPage = page ?? 1; //Default page = 1

		const products = await Product.find({})
			.skip((currentPage - 1) * limit)
			.populate('category')
			.populate('subCategory')
			.sort([[sort, order]])
			.limit(limit)
			.exec();

		res.json(products);
	} catch (error) {
		console.log(error);
	}
};

exports.getPoductsCount = async (req, res) => {
	let totalCount = await Product.find({}).estimatedDocumentCount().exec();
	res.json(totalCount).status(200);
};

exports.updateProductRating = async (req, res) => {
	const product = await Product.findById(req.params.productId).exec();
	const user = await User.findOne({ email: req.user.email }).exec();
	const { star } = req.body;

	//Check current logged in user has already added rating to a product
	let existingRating = product.ratings.find(
		(element) => element.postedBy.toString() === user._id.toString()
	);
	
	//If user has not left any rating yet
	if (existingRating === undefined) {
		let newRating = await Product.findByIdAndUpdate(
			product._id,
			{ $push: { ratings: { star, postedBy: user._id } } },
			{ new: true }
		).exec();
		
		res.status(200).json(newRating);
	} else {
		//Find product and update the rating
		if (star < existingRating.star) {
			res.send(`Your rating is lower than ${existingRating.star}`);
			return;
		}
		let updatedRating = await Product.updateOne(
			{ ratings: { $elemMatch: existingRating } },
			{ $set: { 'ratings.$.star': star } },
			{ new: true }
		).exec()
		
		res.json(updatedRating);
	}
};

exports.getAllRelated = async (req, res) => {
	const {productId, limit} = req.params
	try {
		const product = await Product.findById(productId).exec();
		const relatedProducts = await Product.find({
			_id: { $ne: product._id },
			category: product.category,
		})
			.populate('category')
			.populate('subCategory')
			.populate('ratings.postedBy')
			.limit(Number.parseInt(limit))
			.exec();

		res.json(relatedProducts).status(200);
	} catch (error) {
		res.send('Can not find related product').status(404);
		console.log(error)
	}
};

//Text based search

exports.searchFilters = async (req, res) => {
	const { query, price, category, stars, subCategory, shipping, color, brand } = req.body;
	if (query) {
		await handleQueryFilter(req, res, query);
	} 
	if (price !== undefined) {
		await handlePriceFilter(req, res, price);
	}
	if (category) {
		await handleCategoryFilter(req, res, category);
	}
	if (stars) {
		handleStarFilter(req, res, stars);
	}
	if (subCategory) {
		await handleSubCategoryFilter(req, res, subCategory);
	}
	if (shipping) {
		await handleShippingFilter(req, res, shipping);
	}
	if (color) {
		await handleColorFilter(req, res, color);
	}
	if (brand) {
		await handleBrandFilter(req, res, brand);
	}
};

const handleQueryFilter = async (req, res, query) => {
	const queriedProducts = await Product.find({ $text: { $search: query } })
		.populate('category', '_id name')
		.populate('subCategory', '_id name')
		.populate('ratings.postedBy', '_id name')
		.exec();

	res.json(queriedProducts).status(200);
};

const handlePriceFilter = async (req, res, price) => {
	try {
		const products = await Product.find({
			price: {
				$gte: price[0],
				$lte: price[1],
			},
		})
			.populate('category', '_id name')
			.populate('subCategory', '_id name')
			.populate('ratings.postedBy', '_id name')
			.exec();
		
		res.json(products).status(200);
	} catch (error) {
		res.send(error);
	}
};

const handleCategoryFilter = async (req, res, category) => {
	try {
		const products = await Product.find({ category })
			.populate('category', '_id name')
			.populate('subCategory', '_id name')
			.populate('ratings.postedBy', '_id name')
			.exec();
			
		res.json(products);
	} catch (error) {
		res.send(error);
	}
};

const handleStarFilter = (req, res, stars) => {
	Product.aggregate([
		{
			$project: {
				document: '$$ROOT',
				floorAverage: {
					// floor value of 3.33 will be 3
					$floor: { $avg: '$ratings.star' },
				},
			},
		},
		{ $match: { floorAverage: stars } },
	]).exec((err, aggregates) => {
		if (err) res.send('AGGREGATE ERROR', err);
		Product.find({ _id: aggregates })
			.populate('category', '_id name')
			.populate('subs', '_id name')
			.populate('postedBy', '_id name')
			.exec((err, products) => {
				if (err) res.send('PRODUCT AGGREGATE ERROR', err);
				res.json(products).status(200);
			});
	});
};

const handleSubCategoryFilter = async (req, res, subCategory) => {
	try {
		const products = await Product.find({ subCategory })
			.populate('category', '_id name')
			.populate('subCategory', '_id name')
			.populate('ratings.postedBy', '_id name')
			.exec();

		res.json(products).status(200);
	} catch (error) {
		res.send(error);
	}
};

const handleShippingFilter = async (req, res, shipping) => {
	const products = await Product.find({ shipping })
		.populate('category', '_id name')
		.populate('subCategory', '_id name')
		.populate('ratings.postedBy', '_id name')
		.exec();
	
	res.json(products).status(200);
	
};

const handleColorFilter = async (req, res, color) => {
	const products = await Product.find({ color })
		.populate('category', '_id name')
		.populate('subCategory', '_id name')
		.populate('ratings.postedBy', '_id name')
		.exec();

	res.json(products).status(200);
};

const handleBrandFilter = async (req, res, brand) => {
	const products = await Product.find({ brand })
		.populate('category', '_id name')
		.populate('subCategory', '_id name')
		.populate('ratings.postedBy', '_id name')
		.exec();

	res.json(products).status(200);
};