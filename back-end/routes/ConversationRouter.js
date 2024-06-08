import express from 'express'
import { ConversationController } from '../controllers/index.js';

const ConversationRouter = express.Router();

ConversationRouter.post("/create-conversation")
ConversationRouter.get("/:type", ConversationController.getConverByType)

export default ConversationRouter