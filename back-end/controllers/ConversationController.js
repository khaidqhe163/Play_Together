import { ConversationService } from '../services/index.js'
const getConverByType = async (req, res) => {
    try {
        const type = req.params.type;
        console.log(type);
        const conversation = await ConversationService.getConverByType(type)
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error);
    }
}

const createConversation = async (req, res) => {
    try {
        const members = req.body.members;
        const type = 2;
        const existConversation = await ConversationService.getConversation(members[0], members[1]);
        if (existConversation) {
            return res.status(500).json({
                message: "This conversation has already exist!"
            })
        }
        const conversation = await ConversationService.createConversation(type, members);
        res.status(201).json(conversation)
    } catch (error) {
        res.status(500).json(error);
    }
}

const getConversation = async (req, res) => {
    try {
        const member1 = req.params.firstId;
        const member2 = req.params.secondId;
        const conversation = await ConversationService.getConversation(member1, member2);
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error);
    }
}
export default {
    getConverByType,
    createConversation,
    getConversation
}