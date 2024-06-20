import Conversation from '../models/Conversation.js';
import Message from '../models/Message.js'

const getMessage = async (id) => {
    try {
        const messages = await Message.find({ conversationId: id }).populate("senderId", ['username', 'avatar'])
        return messages;
    } catch (error) {
        throw new Error(error.toString())
    }
}

const createMessage = async (messageType, conversationId, senderId, text) => {
    try {
        console.log(conversationId);
        const newMessage = (await Message.create({ messageType, conversationId, senderId, text })).populate("senderId", ["username", "avatar"]);
        await Conversation.updateOne({ _id: conversationId }, { $set: { latestTime: new Date() } });
        return newMessage;
    } catch (error) {
        throw new Error(error.toString());
    }
}

const getMessageByConId = async (id) => {
    try {
        const messages = await Message.find({ conversationId: id })
        return messages
    } catch (error) {
        throw new Error(error.toString());
    }
}

const getUnreadMessage = async (id, cId) => {
    try {
        const messages = await Message.find({
            conversationId: cId,
            senderId: { $ne: id },
            isRead: false
        });
        return messages
    } catch (error) {
        throw new Error(error.toString());
    }
}

const getLatestMessage = async (cId) => {
    try {
        const message = await Message.findOne({
            conversationId: cId
        }).sort({ createdAt: -1 });;
        return message
    } catch (error) {
        throw new Error(error.toString());
    }
}

const handleReadMess = async (senderId, conversationId) => {
    try {
        await Message.updateMany({ conversationId: conversationId, senderId: { $ne: senderId } }, { $set: { isRead: true } })
    } catch (error) {
        throw new Error(error)
    }
}
export default {
    getMessage,
    createMessage,
    getMessageByConId,
    getUnreadMessage,
    getLatestMessage,
    handleReadMess
}