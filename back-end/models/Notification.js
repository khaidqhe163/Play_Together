import mongoose, {Schema} from "mongoose";
const notificationSchema = new Schema({
    receiver: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    content: {
        type: String
    },
}, {
    timestamps: true
});

const Notification = mongoose.model('notification', notificationSchema);
export default Notification

