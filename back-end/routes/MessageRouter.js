import express from 'express'
import { MessageController } from '../controllers/index.js';
import jwt from '../middleware/jwt.js';
const MessageRouter = express.Router();

MessageRouter.get("/:id", MessageController.getMessage);

MessageRouter.post("/", jwt.verifyAccessToken ,MessageController.createMessage)

export default MessageRouter