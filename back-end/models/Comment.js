import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
    storyId: { type: Schema.Types.ObjectId, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    stars: { type: Number, min: 1, max: 5, default: 5 },
    commentor: { type: Schema.Types.ObjectId, required: true },
    reply: Schema.Types.ObjectId
});

const Comment = mongoose.model("comment", commentSchema);
export default Comment;
