import Conversation from "../models/Conversation.js"

const getConverByType = async (type) => {
    try {
        const conversation = await Conversation.findOne({ type: Number(type) })
        console.log(conversation);
        return conversation
    } catch (error) {
        throw new Error(error)
    }
}

const createConversation = async (type, members) => {
    try {
        const members = req.body.members;
        const conversation = await Conversation.create({ type, members });
        return conversation;
    } catch (error) {
        throw new Error(error)
    }
}

const getConversation = async (member1, member2) => {
    try {
        const conversation = await Conversation.findOne({ members: { $all: [member1, member2] } });
        return conversation;
    } catch (error) {
        throw new Error(error)
    }
}

const getConversationByUserId = async (id) => {
    try {
        const conversations = await Conversation.find({ members: id }).populate('members', ["username", "avatar"]);
        console.log(conversations);
        return conversations
    } catch (error) {
        throw new Error(error)
    }
}
export default {
    getConverByType,
    createConversation,
    getConversation,
    getConversationByUserId
}