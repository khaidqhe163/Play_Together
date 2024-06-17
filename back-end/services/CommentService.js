import Story from '../models/Story.js';
import User from '../models/User.js';
import Comment from '../models/Comment.js';

export const getAllCommentsByStoryId = async (storyID) => {
    try {
        const comments = await Comment.find({ storyId: storyID }).populate('commentor', ['username', 'avatar']).populate('reply', ['username']);
        return comments;
    } catch (error) {
        throw new Error("Error fetch comments: " + error.message);
    }
};

const createComment = async (data) => {
    try {
        const comment = await Comment.create(data)
        return comment
    } catch (error) {
        throw new Error("Error fetch comments: " + error.message);
    }
}

const deleteComment = async (commentId) => {
    try {
        const result = await Comment.findByIdAndDelete(commentId)
        if (!result) {
            throw new Error('Comment not found')
        }
        return result
    } catch (error) {
        throw new Error(error.message);
    }
}

const updateComment = async (updateData, commentId) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(commentId, updateData, { new: true })
        return updatedComment
    } catch (error) {
        throw new Error('Error updating comment');
    }
};


export default {
    getAllCommentsByStoryId,
    createComment,
    deleteComment,
    updateComment,
}