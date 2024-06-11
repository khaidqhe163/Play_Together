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
        return newMessage;
    } catch (error) {
        throw new Error(error.toString());
    }
}
export default {
    getMessage,
    createMessage
}