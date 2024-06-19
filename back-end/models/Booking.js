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
    },
    bookingStatus: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});
const Booking = mongoose.model("booking", bookingSchema);
export default Booking; 