import mongoose, { Schema } from "mongoose";
const notificationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    receivers: {
        type: [Schema.Types.ObjectId],
        ref: "user",
    },
    type: {
        type: String
    },
    content: {
        type: String
    },
    url: String,
    storyId: Schema.Types.ObjectId,
    isRead: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Notification = mongoose.model('notification', notificationSchema);
export default Notification

