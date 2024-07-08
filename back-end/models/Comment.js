import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
    storyId: { type: Schema.Types.ObjectId, ref: 'story'},
    bookingId: { type: Schema.Types.ObjectId, ref: 'booking'},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    rating: { type: Number, min: 1, max: 5},
    commentor: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    content: {type: String, required: true},
    reply: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
}, {
    timestamps: true
});

const Comment = mongoose.model("comment", commentSchema);
export default Comment;
