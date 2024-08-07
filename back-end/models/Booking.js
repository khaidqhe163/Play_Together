import mongoose, { Schema, SchemaTypes } from "mongoose";
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
        ref: "schedule"
    },
    unit: {
        type: Number,
        default: 0,
    },
    bookingStatus: {
        type: Number,
        default: true
    },
    bookingReview: {
        type: Schema.Types.ObjectId,
        ref: "comment"
    },
    reported: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
const Booking = mongoose.model("booking", bookingSchema);
export default Booking; 