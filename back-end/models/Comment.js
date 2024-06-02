import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
    storyId: { type: Schema.Types.ObjectId, ref: 'story', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    stars: { type: Number, min: 1, max: 5, default: 5 },
    commentor: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    content: {type: String, required: true},
    reply: Schema.Types.ObjectId
});

const Comment = mongoose.model("comment", commentSchema);
export default Comment;
