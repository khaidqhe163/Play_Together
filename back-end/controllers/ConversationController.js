import { ConversationService } from '../services/index.js'
const getConverByType = async (req, res) => {
    try {
        const type = req.params.type;
        const conversation = await ConversationService.getConverByType(type)
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error);
    }
}

const createConversation = async (req, res) => {
    try {
        const member1 = req.payload.id;
        const member2 = req.body.member;
        const type = 2;
        console.log(member1, member2);
        const existConversation = await ConversationService.getConversation(member1, member2);
        if (existConversation) {
            return res.status(400).json({
                message: "This conversation has already exist!"
            })
        }
        const conversation = await ConversationService.createConversation(type, member1, member2);
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

const getConversationByUserId = async (req, res) => {
    try {
        const conversations = await ConversationService.getConversationByUserId(req.payload.id);
        res.status(200).json(conversations);
    } catch (error) {
        res.status(500).json(error);
    }
}


export default {
    getConverByType,
    createConversation,
    getConversation,
    getConversationByUserId,

}