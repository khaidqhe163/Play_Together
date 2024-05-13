import mongoose, { Schema } from "mongoose";

const conversationSchema = new Schema({
    member: [{ type: Schema.Types.ObjectId, required: true }],
});

const Conversation = mongoose.model("conversation", conversationSchema);
export default Conversation;
