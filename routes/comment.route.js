const express = require('express');
const router = express.Router();

/** Import Middlewars Function - Auth Controller */
const { authVerifyToken } = require('../middlewares/auth.middleware');

/** Import Product Controllers - CRUD */
const {
	saveProductCommnet,
	getAllProductComments,
	updateProductComment,
	deleteProductComment,
	addLikeComment,
	removeLikeComment,
	getCommentLikeCount,
	addDislikeComment,
	removeDislikeComment,
	getCommentDislikeCount,
} = require('../controllers/comment.controller');

/** Routes */
router.post('/comment/save-comment', authVerifyToken, saveProductCommnet);
router.post('/comment/save-comment', authVerifyToken, saveProductCommnet);
router.get('/comment/:productId/list-all', getAllProductComments);
router.put('/comment/:commentId/update-comment', authVerifyToken, updateProductComment);
router.delete('/comment/:commentId/remove-comment', authVerifyToken, deleteProductComment);

//Like, Dislike
router.post('/comment/like/:commentId', authVerifyToken, addLikeComment);
router.delete('/comment/:userId/like/:commentId', authVerifyToken, addDislikeComment);
router.get('/comment/like/:commentId', getCommentLikeCount);
router.post('/comment/dislike/:commentId', authVerifyToken, removeLikeComment);
router.get('/comment/dislike/:commentId', getCommentDislikeCount);
router.delete('/comment/:userId/dislike/:commentId', authVerifyToken, removeDislikeComment);

module.exports = router;
