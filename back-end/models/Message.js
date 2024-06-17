import mongoose, { Schema } from "mongoose"

const message = new Schema({
    messageType: { type: Number },
    conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'conversation' },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    text: String,
    isRead: { type: Boolean, default: false }
}, {
    timestamps: true,
})

const Message = mongoose.model('message', message)

export default Message