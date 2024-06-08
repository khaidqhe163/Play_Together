import { ConversationService } from '../services/index.js'
const getConverByType = async (req, res) => {
    try {
        const type = req.params.type;
        console.log(type);
        const conversation = await ConversationService.getConverByType(type)
        res.status(200).json(conversation);
    } catch (error) {
        throw new Error(error)
    }
}

export default {
    getConverByType
}