import express from 'express'
import jwt from '../middleware/jwt.js';
import { NotificationController } from '../controllers/index.js';
const NotificationRouter = express.Router();

NotificationRouter.post("/send-post-story-notification", jwt.verifyAccessToken, NotificationController.sendPostStoryNotification)
NotificationRouter.get("/", jwt.verifyAccessToken, NotificationController.getNotification)
NotificationRouter.post("/send-reply-story-notifcation", jwt.verifyAccessToken, NotificationController.sendReplyStoryNotification)
NotificationRouter.post("/comment-story-notification", jwt.verifyAccessToken, NotificationController.sendCommentStoryNotification)
NotificationRouter.put("/read-notification", jwt.verifyAccessToken, NotificationController.readNotification)
NotificationRouter.post("/like-story-notification", jwt.verifyAccessToken, NotificationController.likeStoryNotification)
NotificationRouter.post("/booking-notification", jwt.verifyAccessToken, NotificationController.sendBookingNotification)
export default NotificationRouter