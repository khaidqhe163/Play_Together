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
        console.log(receivers);
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
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json(error)
    }
}

const readNotification = async (req, res) => {
    try {
        const id = req.payload.id;
        await NotificationService.readNotification(id)
        res.status(200).json("success");
    } catch (error) {
        res.status(500).json(error)
    }
}

const likeStoryNotification = async (req, res) => {
    try {
        const userId = req.payload.id;
        const {
            storyId,
        } = req.body;
        const notification = await NotificationService.likeStoryNotification(storyId, userId);
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json(error)
    }
}

const sendBookingNotification = async (req, res) => {
    try {
        const userId = req.payload.id;
        // const {
        //     bookingId,
        //     playerId,

        // }
        const notification = await NotificationService.sendBookingNotification(userId, bookingId);
        res.status(200).json(notification);
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
    sendBookingNotification
}