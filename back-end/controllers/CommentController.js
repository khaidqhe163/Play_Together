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

export default {
    getAllCommentsByStoryId,
}