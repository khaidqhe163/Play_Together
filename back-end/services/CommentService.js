import Story from '../models/Story.js';
import User from '../models/User.js';
import Comment from '../models/Comment.js';

export const getAllCommentsByStoryId = async (storyID) => {
    try {
        const comments = await Comment.find({ storyId: storyID }).populate('commentor', 'username avatar');
        return comments;
    } catch (error) {
        throw new Error("Error fetch comments: " + error.message);
    }
};


export default {
    getAllCommentsByStoryId,
}