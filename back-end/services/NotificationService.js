import Notification from "../models/Notification.js"
import Story from "../models/Story.js";
import CommentService from "./CommentService.js";

const sendReplyStoryNotification = async (storyId, commentor, commentId, replyId) => {
    try {
        const content = "vừa trả lời bình luận của bạn";
        const url = `/stories/${storyId}/${commentId}`;
        const receivers = [replyId]
        const type = "reply comment"
        const notification = (await Notification.create({ userId: commentor, receivers, type, content, url, sendDate: Date.now() })).populate("userId", ["username", "avatar"]);
        return notification
    } catch (error) {
        throw new Error(error)
    }
}


const sendPostStoryNotification = async (id, storyId, receivers) => {
    try {
        const content = "vừa đăng story trên trang cá nhân"
        const url = "/stories/" + storyId
        const type = "post story"
        const notification = (await Notification.create({ userId: id, receivers, type, content, url, storyId, sendDate: Date.now() })).populate("userId", ["username", "avatar"]);
        return notification
    } catch (error) {
        throw new Error(error)
    }
}


const getNotification = async (id) => {
    try {
        const notifications = await Notification.find({ receivers: id }).populate("userId", ["username", "avatar"]).sort({ sendDate: -1 }).exec();
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
            const url = `/stories/${storyId}/${commentId}`
            const type = "comment story"
            notification = (await Notification.create({ userId: commentor, receivers: [author], type, content, url, storyId, sendDate: Date.now() })).populate("userId", ["username", "avatar"])

        } else {
            console.log(commentor);
            notification = await Notification.findOneAndUpdate({ storyId, type: "comment story" }, {
                $set: {
                    userId: commentor,
                    content: `đã bình luận trong story của bạn`,
                    isRead: false,
                    sendDate: Date.now()
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
        await Notification.updateMany({ receivers: id, isRead: false }, { $set: { isRead: true } })
    } catch (error) {
        throw new Error(error)
    }
}

const likeStoryNotification = async (storyId, userId) => {
    try {
        const story = await Story.findOne({ _id: storyId }).exec();
        let existNotification;
        if (story.like.length === 1) existNotification = await Notification.findOne({ storyId, type: "like story" })
        let notification;
        let content;
        if (story.like.length === 1 && !existNotification) {
            content = "đã thích story của bạn";
            const url = `/stories/${storyId}`
            const type = "like story"
            notification = (await Notification.create({ userId: userId, receivers: [story.author], type, content, url, storyId, sendDate: Date.now() })).populate("userId", ["username", "avatar"])
        } else {
            console.log("zoday");
            if (story.like.length === 1)
                content = "đã thích story của bạn"
            else content = `và ${story.like.length - 1} người khác đã thích story của bạn`

            notification = await Notification.findOneAndUpdate({ storyId, type: "like story" }, {
                $set: {
                    userId: userId,
                    content: content,
                    isRead: false,
                    sendDate: Date.now()
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

const sendBookingNotification = async (userId, bookingId, playerId, onlySchedule) => {
    try {
        let content;
        let url;
        if (!onlySchedule) {
            content = "muốn chơi cùng bạn. Đơn thuê này hiệu lực trong vòng 5 phút!"
            url = "/bookings/online/" + bookingId;
        } else {
            content = "muốn chơi cùng bạn vào ngày"
            url = "/bookings/schedule/" + bookingId;
        }
        const type = "booking";
        const notification = (await Notification.create({ userId, receivers: playerId, type, content, url, sendDate: Date.now() })).populate("userId", ["username", "avatar"])
        return notification;
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
    likeStoryNotification,
    sendBookingNotification
}