import Conversation from "../models/Conversation.js"
import MessageService from "./MessageService.js";

const getConverByType = async (type) => {
    try {
        const conversation = await Conversation.findOne({ type: Number(type) })
        console.log(conversation);
        return conversation
    } catch (error) {
        throw new Error(error)
    }
}

const createConversation = async (type, member1, member2) => {
    try {
        const date = new Date();
        const conversation = (await (Conversation.create({ type, members: [member1, member2], latestTime: date }))).populate('members', ["username", "avatar"]);
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
        const returnConversations = await Promise.all(conversations.map(async (c) => {
            try {
                const unreadMessage = await MessageService.getUnreadMessage(id, c._id);
                let latestMessage = null;
                if (unreadMessage.length === 0) {
                    latestMessage = await MessageService.getLatestMessage(c._id);
                }
                const returnMessage = {
                    ...c.toObject(),
                    unread: unreadMessage.length,
                    lastestMessage: unreadMessage[unreadMessage.length - 1]?.text || latestMessage.text || null
                }
                return returnMessage
            } catch (error) {
                return { ...c.toObject(), unread: 0, latestMessage: null };
            }
        }))
        const finalReturnConvers = returnConversations.sort((a, b) => {
            console.log(a.latestTime > b.latestTime);
            if (a.latestTime >= b.latestTime) {
                return -1
            } else return 1
        })

        return finalReturnConvers
    } catch (error) {
        throw new Error(error)
    }
}


export default {
    getConverByType,
    createConversation,
    getConversation,
    getConversationByUserId,
}