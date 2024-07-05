import Story from '../models/Story.js';
import User from '../models/User.js';
import Comment from '../models/Comment.js';
import Booking from '../models/Booking.js';

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

const reviewPlayer = async (commentor, userId, rating, content, bookingId) => {
    try {
        const review = await Comment.create({ bookingId, userId, rating, commentor, content });
        await Booking.updateOne({ _id: bookingId }, { $set: { bookingReview: review._id } })
        return review;
    } catch (error) {
        throw new Error('Error updating comment');
    }
}

const getReviewPlayer = async (playerId) => {
    try {
        const reviews = await Comment.find({ userId: playerId, rating: { $exists: true } }).populate("commentor", "username avatar")
        return reviews
    } catch (error) {
        throw new Error('Error updating comment');
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