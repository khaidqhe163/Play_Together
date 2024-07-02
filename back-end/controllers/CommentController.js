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

const deleteComment = async (req, res) => {
    const { commentId } = req.params
    try {
        const result = await CommentService.deleteComment(commentId)
        return res.status(200).json({
            message: 'Comment deleted successfully',
            data: result,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const updateComment = async (req, res) => {
    const { commentId } = req.params
    const updateData = req.body

    try {
        const updatedComment = await CommentService.updateComment(updateData, commentId)
        if (!updatedComment) {
            return res.status(404).json({ message: 'Comment not found' })
        }
        res.status(200).json(updatedComment)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};


const reviewPlayer = async (req, res) => {
    try {
        const commentor = req.payload.id;
        console.log(commentor);
        const {
            userId,
            rating,
            content,
            bookingId
        } = req.body;
        const review = await CommentService.reviewPlayer(commentor, userId, rating, content, bookingId);
        res.status(201).json(review)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getReviewPlayer = async (req, res) => {
    try {
        const playerId = req.params.playerId;
        const reviews = await CommentService.getReviewPlayer(playerId);
        res.status(200).json(reviews)
    } catch (error) {
        res.status(500).json(error)
    }
}
export default {
    getAllCommentsByStoryId,
    createComment,
    deleteComment,
    updateComment,
    reviewPlayer,
    getReviewPlayer
}