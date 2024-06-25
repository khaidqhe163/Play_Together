import mongoose, { Schema } from "mongoose";
const bookingSchema = new Schema({
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
    price: {
        type: Number,
        required: true
    },
    hours: {
        type: [Schema.Types.ObjectId],
        default: [],
    },
    unit: {
        type: Number,
        default: 0,
    },
    bookingStatus: {
        type: Number,
        default: true
    }
}, {
    timestamps: true
});
const Booking = mongoose.model("booking", bookingSchema);
export default Booking; 