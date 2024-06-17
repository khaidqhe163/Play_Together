import { CommentService } from "../services/index.js";

export const getAllCommentsByStoryId = async (req, res) => {
    const storyID = req.params.storyID;
    try {
        const comments = await CommentService.getAllCommentsByStoryId(storyID);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createComment = async (req, res) => {
    try {
        const { storyId, userId, commentor, content, reply } = req.body

        const data = {}
        if (storyId) data.storyId = storyId
        if (userId) data.userId = userId
        if (commentor) data.commentor = commentor
        if (content) data.content = content
        if (reply) data.reply = reply

        if (Object.keys(data).length === 0) {
            return res.status(400).json({ message: 'Comment empty ?' });
        }
        const comment = await CommentService.createComment(data);
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default {
    getAllCommentsByStoryId,
    createComment,
}