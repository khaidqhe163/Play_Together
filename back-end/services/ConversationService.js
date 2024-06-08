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

export default {
    getConverByType
}