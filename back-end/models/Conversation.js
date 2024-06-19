import mongoose, { Schema } from "mongoose";

const conversationSchema = new Schema({
    type: Number,
    members: [{ type: Schema.Types.ObjectId, ref: "user" }],
    latestTime: Date
});

const Conversation = mongoose.model("conversation", conversationSchema);
export default Conversation;
