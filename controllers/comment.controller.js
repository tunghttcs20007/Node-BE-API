const Comment = require('../models/commentSchema');
const User = require('../models/userSchema');
const Like = require('../models/likeSchema');
const Dislike = require('../models/dislikeSchema');

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

exports.addLikeComment = async (req, res) => {
	const { commentId } = req.params;
	const { userId, productId } = req.body;

	new Like({ commentId, userId, productId }).save((error, like) => {
		if (error) res.json(error).status(400);
		else {
			res.json({ success: true, like }).status(201);
		}
	});
};

exports.removeLikeComment = async (req, res) => {
	const { userId, commentId } = req.params;

	Like.findOneAndRemove({ userId, commentId }, { useFindAndModify: false }).exec(
		(error, result) => {
			if (error) res.json(error).status(400);
			else res.json({ success: true }).status(204);
		}
	);
};

exports.addDislikeComment = async (req, res) => {
	const { commentId } = req.params;
	const { userId, productId } = req.body;

	new Dislike({ commentId, userId, productId }).save((error, dislike) => {
		if (error) res.json(error).status(400);
		else res.json({ success: true, dislike }).status(201);
	});
};

exports.removeDislikeComment = async (req, res) => {
	const { userId, commentId } = req.params;

	Dislike.findOneAndRemove({ userId, commentId }, { useFindAndModify: false }).exec(
		(error, result) => {
			if (error) res.json(error).status(400);
			else res.json({ success: true }).status(204);
		}
	);
};

exports.getCommentLikeCount = async (req, res) => {
	const { commentId } = req.params;

	Like.find({ commentId }).exec((error, likes) => {
		if (error) {
			res.json(error).status(404);
		} else {
			let count = likes.length;
			res.json({ success: true, count, likes }).status(200);
		}
	});
};

exports.getCommentDislikeCount = async (req, res) => {
	const { commentId } = req.params;

	Dislike.find({ commentId }).exec((error, dislikes) => {
		if (error) {
			res.json(error).status(404);
		} else {
			let count = dislikes.length;
			res.json({ success: true, count, dislikes }).status(200);
		}
	});
};
