import { ConversationService, MessageService } from "../services/index.js";

const getMessage = async (req, res) => {
    try {
        const conversationId = req.params.id;
        const messages = await MessageService.getMessage(conversationId);
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json(error)
    }
}

const createMessage = async (req, res) => {
    try {
        const {
            messageType,
            conversationId,
            text
        } = req.body;
        const senderId = req.payload.id
        const newMessage = await MessageService.createMessage(messageType, conversationId, senderId, text);
        res.status(201).json(newMessage)
    } catch (error) {
        res.status(500).json(error)
    }
}
export default {
    getMessage,
    createMessage
}