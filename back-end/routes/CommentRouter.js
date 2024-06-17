import express from 'express'
import { CommentController } from '../controllers/index.js';

const CommentRouter = express.Router();

CommentRouter.get('/:storyID', CommentController.getAllCommentsByStoryId);
CommentRouter.post('/', CommentController.createComment);
CommentRouter.delete('/:commentId', CommentController.deleteComment);
CommentRouter.put('/:commentId', CommentController.updateComment);

export default CommentRouter;