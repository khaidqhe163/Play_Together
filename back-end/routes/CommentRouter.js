import express from 'express'
import { CommentController } from '../controllers/index.js';

const CommentRouter = express.Router();

CommentRouter.get('/:storyID', CommentController.getAllCommentsByStoryId);

export default CommentRouter;