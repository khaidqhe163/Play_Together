import { NotificationService, UserService } from "../services/index.js";

const sendReplyStoryNotification = async (req, res) => {
    try {
        const commentor = req.payload.id;
        const {
            storyId,
            commentId,
            replyId
        } = req.body;
        const notification = await NotificationService.sendReplyStoryNotification(storyId, commentor, commentId, replyId);
        res.status(201).json(notification)
    } catch (error) {
        res.status(500).json(error)
    }
}

const sendPostStoryNotification = async (req, res) => {
    try {
        const id = req.payload.id
        const storyId = req.body.storyId;
        const receivers = await UserService.getFollowerById(id);
        if (!receivers && receivers.length === 0)
            res.status(400).json("No one followers")
        const notifcation = await NotificationService.sendPostStoryNotification(id, storyId, receivers);
        res.status(201).json(notifcation)
    } catch (error) {
        res.status(500).json(error)
    }
}

const getNotification = async (req, res) => {
    try {
        const id = req.payload.id;
        const notifcations = await NotificationService.getNotification(id);
        res.status(200).json(notifcations)
    } catch (error) {
        res.status(500).json(error)
    }
}

const sendCommentStoryNotification = async (req, res) => {
    try {
        const commentor = req.payload.id;
        const {
            storyId,
            author,
            commentId
        } = req.body;
        const notification = await NotificationService.sendCommentStoryNotification(storyId, author, commentor, commentId);
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json(error)
    }
}

const readNotification = async (req, res) => {
    try {
        const id = req.payload.id;
        await NotificationService.readNotification(id)
        res.status(201).json("success");
    } catch (error) {
        res.status(500).json(error)
    }
}

const likeStoryNotification = async (req, res) => {
    try {
        console.log("like");
        const userId = req.payload.id;
        const {
            storyId,
        } = req.body;
        const notification = await NotificationService.likeStoryNotification(storyId, userId);
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json(error)
    }
}

const sendBookingNotification = async (req, res) => {
    try {
        const userId = req.payload.id;
        const {
            bookingId,
            playerId,
            onlySchedule
        } = req.body;
        const notification = await NotificationService.sendBookingNotification(userId, bookingId, playerId, onlySchedule);
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json(error)
    }
}

const processBookingNotification = async (req, res) => {
    try {
        const playerId = req.payload.id;
        const {
            userId,
            status,
            bookingId
        } = req.body;
        const notification = await NotificationService.processBookingNotification(userId, bookingId, playerId, status)
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json(error)
    }
}

const completeBookingNotification = async (req, res) => {
    try {
        const playerId = req.payload.id;
        const {
            userId,
            bookingId
        } = req.body;
        const notification = await NotificationService.completeBookingNotification(userId, bookingId, playerId);
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json(error)
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
    completeBookingNotification
}