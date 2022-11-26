const Comment = require('../models/commentSchema');
const User = require('../models/userSchema');

exports.saveProductCommnet = async (req, res) => {
	const user = await User.findOne({ email: req.user.email });
	req.body.comment.writtenBy = user._id;

	new Comment(req.body.comment).save((error, comment) => {
		if (error) return res.json({ success: false, err }).status(400);

		Comment.findById(comment._id)
			.populate('writtenBy', '_id name role')
			.exec((error, result) => {
				if (error) return res.status(400).json({ success: false, err });
				return res.status(201).json({ success: true, result });
			});
	});
};

exports.getAllProductComments = async (req, res) => {
	const { productId } = req.params;

	Comment.find({ productId })
		.populate('writtenBy', '_id name role')
		.populate('replyTo', '_id name')
		.exec((error, comments) => {
			if (error) res.status(400);
			res.status(200).json({ success: true, comments });
		});
};

exports.updateProductComment = async (req, res) => {
	const { commentId } = req.params;

	Comment.findByIdAndUpdate(commentId, req.body, {
		useFindAndModify: false,
		new: true,
	}).exec((error, result) => {
		if (error) {
			res.status(404).json(error);
		} else res.status(200).json({ success: true, result });
	});
};

exports.deleteProductComment = async (req, res) => {
	const { commentId } = req.params;

	Comment.findByIdAndRemove(commentId, { useFindAndModify: false }).exec((error, result) => {
		if (error) {
			res.status(400).json(error);
		} else res.status(204).json(result);
	});
};
