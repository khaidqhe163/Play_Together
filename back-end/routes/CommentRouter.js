import express from 'express'
import { CommentController } from '../controllers/index.js';
import jwt from '../middleware/jwt.js';

const CommentRouter = express.Router();

CommentRouter.get('/:storyID', CommentController.getAllCommentsByStoryId);
CommentRouter.post('/', CommentController.createComment);
CommentRouter.delete('/:commentId', CommentController.deleteComment);
CommentRouter.put('/:commentId', CommentController.updateComment);
CommentRouter.post('/review-player', jwt.verifyAccessToken, CommentController.reviewPlayer)
CommentRouter.get('/review-player/:playerId', CommentController.getReviewPlayer)
export default CommentRouter;