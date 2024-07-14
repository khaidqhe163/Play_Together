import Booking from "../models/Booking.js";
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
        const existNotify = await Notification.findOne({ storyId: storyId, type: "comment story" });
        console.log(existNotify);
        if (comments.length <= 1 || !existNotify) {
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
        let existNotification = await Notification.findOne({ storyId, type: "like story" })
        let content;
        let notification;
        if (!existNotification) {
            content = "đã thích story của bạn";
            const url = `/stories/${storyId}`
            const type = "like story"
            notification = (await Notification.create({ userId: userId, receivers: [story.author], type, content, url, storyId, sendDate: Date.now() })).populate("userId", ["username", "avatar"])
        } else {
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
            url = "/list-booking/booking-online";
        } else {
            content = "đã đặt lịch chơi cùng bạn"
            url = "/list-booking/booking-schedule";
        }
        const type = "booking";
        const notification = (await Notification.create({ userId, receivers: playerId, type, content, url, sendDate: Date.now() })).populate("userId", ["username", "avatar"])
        return notification;
    } catch (error) {
        throw new Error(error)
    }
}

const processBookingNotification = async (userId, bookingId, playerId, status) => {
    try {
        let content;
        let url = "";
        if (status === 1) {
            content = "yêu cầu thuê của bạn được chấp nhận. Hãy nhắn tin với tôi để bắt đầu cuộc chơi"
            url = `/list-booking/my-booking`;
        }
        if (status === 3) {
            content = "yêu cầu thuê của bạn bị từ chối. Xin lỗi vì sự bất tiện này"
        }

        const type = "process booking";
        const notification = (await Notification.create({ userId: playerId, receivers: userId, type, content, url, sendDate: Date.now() })).populate("userId", ["username", "avatar"])
        return notification
    } catch (error) {
        throw new Error(error)
    }
}

const completeBookingNotification = async (userId, bookingId, playerId) => {
    try {
        const content = "cuộc chơi của bạn đã kết thúc. Hãy cho tôi đánh giá của bạn nhé!"
        const url = "/list-booking/my-booking";
        const type = "complete booking"
        const notification = (await Notification.create({ userId: playerId, receivers: userId, type, content, url, sendDate: Date.now() })).populate("userId", ["username", "avatar"])
        return notification
    } catch (error) {
        throw new Error(error)
    }
}
const donateNotification = async (userId, playerId, money) => {
    try {
        const content = "đã donate cho bạn " + money;
        const type = "donate"
        const notification = (await Notification.create({ userId: userId, receivers: playerId, type, content, sendDate: Date.now() })).populate("userId", ["username", "avatar"])
        return notification
    } catch (error) {
        throw new Error(error)
    }
}

const reportBookingNotification = async (adminId, complaint, bookingId) => {
    try {
        const booking = await Booking.findById(bookingId)
        if (complaint === 0) {
            console.log("zoday");
            const content = "Thông báo đơn của bạn từ chối. Bằng chứng bạn đưa ra chưa đủ thuyết phục"
            const url = "/list-booking/my-booking"
            const type = "process report"
            const noti = (await Notification.create({
                userId: adminId, receivers: booking.userId, type, content, url, sendDate: Date.now()
            })).populate("userId", ["username", "avatar"]);
            console.log("notification", noti);
            return noti
        } else {
            const content1 = `Đơn tố cáo của bạn về đơn #${booking._id} đã được chúng tôi duyệt. Số tiền ${booking.price} mà bạn thuê đã được hoàn trả vào tài khoản của bạn`
            const content2 = `Người dùng đã tố cáo bạn với booking #${booking._id}. Sau thời gian xác thực chúng tôi đã huỷ booking của bạn và trả lại tiền booking đó cho người dùng`
            const url1 = "/list-booking/my-booking"
            const url2 = "/player-history"
            const type = "process report"
            const noti1 = (await Notification.create({
                userId: adminId, receivers: booking.userId, type, content: content1, url: url1, sendDate: Date.now()
            })).populate("userId", ["username", "avatar"])
            const noti2 = (await Notification.create({
                userId: adminId, receivers: booking.playerId, type, content: content2, url: url2, sendDate: Date.now()
            })).populate("userId", ["username", "avatar"])

            console.log([noti1, noti2]);
            return [noti1, noti2]
        }
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
    sendBookingNotification,
    processBookingNotification,
    completeBookingNotification,
    reportBookingNotification,
    donateNotification
}