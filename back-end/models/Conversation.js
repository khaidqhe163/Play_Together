import mongoose, { Schema } from "mongoose";

const conversationSchema = new Schema({
    type: Number,
    members: [{ type: Schema.Types.ObjectId }],
});

const Conversation = mongoose.model("conversation", conversationSchema);
export default Conversation;
