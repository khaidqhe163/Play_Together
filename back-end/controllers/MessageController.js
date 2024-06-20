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

const getMessageByConId = async (req, res) => {
    try {
        const conId = req.params.id;
        const messages = await MessageService.getMessageByConId(conId);
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json(error)
    }
}

const handleReadMess = async (req, res) => {
    try {
        await MessageService.handleReadMess(req.payload.id, req.params.id)
        res.status(200).json({ message: "success" });
    } catch (error) {
        res.status(500).json(error);
    }
}
export default {
    getMessage,
    createMessage,
    getMessageByConId,
    handleReadMess
}