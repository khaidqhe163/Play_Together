import express from 'express'
import { ConversationController } from '../controllers/index.js';
import jwt from '../middleware/jwt.js';

const ConversationRouter = express.Router();

ConversationRouter.post("/create-conversation", jwt.verifyAccessToken, ConversationController.createConversation)
ConversationRouter.get("/get-all/:id", jwt.verifyAccessToken, ConversationController.getConversationByUserId)
ConversationRouter.get("/:type", ConversationController.getConverByType)
ConversationRouter.get("/get-conversation-by-id/:firstId/:secondId", jwt.verifyAccessToken, ConversationController.getConversation)


export default ConversationRouter