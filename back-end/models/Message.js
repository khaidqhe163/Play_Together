import mongoose, { Schema } from "mongoose"

const message = new Schema({
    messageType: { type: Number },
    conversasionId: { type: mongoose.Schema.Types.ObjectId, ref: 'conversasion' },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    isRead: { type: Boolean }
}, {
    timestamps: true,
})

const Message = mongoose.model('message', message)

export default Message