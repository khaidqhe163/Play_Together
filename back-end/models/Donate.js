import mongoose, { Schema } from "mongoose";
const donateSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    playerId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    money: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});
const Donate = mongoose.model("donate", donateSchema);
export default Donate; 
