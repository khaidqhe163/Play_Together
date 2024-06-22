import Notification from "../models/Notification.js"
import Story from "../models/Story.js";
import CommentService from "./CommentService.js";

const sendReplyStoryNotification = async (storyId, commentor, commentId, replyId) => {
    try {
        const content = "vừa trả lời bình luận của bạn";
        const url = `/story/${storyId}/${commentId}`;
        const receivers = [replyId]
        const type = "reply comment"
        const notification = (await Notification.create({ userId: commentor, receivers, type, content, url })).populate("userId", ["username", "avatar"]);
        return notification
    } catch (error) {
        throw new Error(error)
    }
}


const sendPostStoryNotification = async (id, storyId, receivers) => {
    try {
        const content = "vừa đăng story trên trang cá nhân"
        const url = "/story/" + storyId
        const type = "post story"
        const notification = (await Notification.create({ userId: id, receivers, type, content, url, storyId })).populate("userId", ["username", "avatar"]);
        return notification
    } catch (error) {
        throw new Error(error)
    }
}


const getNotification = async (id) => {
    try {
        const notifications = await Notification.find({ receivers: id }).populate("userId", ["username", "avatar"]).sort({ updatedAt: -1 }).exec();
        return notifications;
    } catch (error) {
        throw new Error(error)
    }
}

const sendCommentStoryNotification = async (storyId, author, commentor, commentId) => {
    try {
        const comments = await CommentService.getAllCommentsByStoryId(storyId);
        let notification;
        console.log(comments.length);
        if (comments.length <= 1) {
            const content = "đã bình luận trong story của bạn";
            const url = `/story/${storyId}/${commentId}`
            const type = "comment story"
            notification = (await Notification.create({ userId: commentor, receivers: [author], type, content, url, storyId })).populate("userId", ["username", "avatar"])

        } else {
            console.log(commentor);
            notification = await Notification.findOneAndUpdate({ storyId, type: "comment story" }, {
                $set: {
                    userId: commentor,
                    content: `đã bình luận trong story của bạn`,
                    isRead: false
                },
            },
                { new: true }
            ).populate("userId", ["username", "avatar"])
        }
        console.log(notification);
        return notification
    } catch (error) {
        throw new Error(error)
    }
}

const readNotification = async (id) => {
    try {
        await Notification.updateMany({ receivers: id }, { $set: { isRead: true } })
    } catch (error) {
        throw new Error(error)
    }
}

const likeStoryNotification = async (storyId, userId) => {
    try {
        console.log(storyId);
        const story = await Story.findOne({ _id: storyId }).exec();
        let notification;
        console.log(story.like.length);
        if (story.like.length === 1) {
            const content = "đã thích story của bạn";
            const url = `/story/${storyId}`
            const type = "like story"
            notification = (await Notification.create({ userId: userId, receivers: [story.author], type, content, url, storyId })).populate("userId", ["username", "avatar"])
        } else {
            notification = await Notification.findOneAndUpdate({ storyId, type: "like story" }, {
                $set: {
                    userId: userId,
                    content: `và ${story.like.length - 1} người khác đã thích story của bạn`,
                    isRead: false
                },
            },
                { new: true }
            ).populate("userId", ["username", "avatar"])
        }
        return notification
    } catch (error) {
        throw new Error(error)
    }
}
export default {
    sendReplyStoryNotification,
    sendPostStoryNotification,
    getNotification,
    sendCommentStoryNotification,
    readNotification,
    likeStoryNotification
}