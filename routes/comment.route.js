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
} = require('../controllers/comment.controller');

/** Routes */
router.post('/comment/save-comment', authVerifyToken, saveProductCommnet);
router.get('/comment/:productId/list-all', getAllProductComments);
router.put('/comment/:commentId/update-comment', authVerifyToken, updateProductComment);
router.delete('/comment/:commentId/remove-comment', authVerifyToken, deleteProductComment);

module.exports = router;
