import express from 'express'
import { ConversationController } from '../controllers/index.js';

const ConversationRouter = express.Router();

ConversationRouter.post("/create-conversation", ConversationController.createConversation)
ConversationRouter.get("/:type", ConversationController.getConverByType)
ConversationRouter.get("/:firstId/:secondId", ConversationController.getConversation);

export default ConversationRouter