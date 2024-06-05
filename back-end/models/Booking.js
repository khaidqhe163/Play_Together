import mongoose, { Schema } from "mongoose";
const bookingSchema = new Schema({
    lessee: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    player: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    serviceLessor: {
        type: Schema.Types.ObjectId,
        ref: "service",
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    hours: {
        type: Number,
        required: true
    },
    completionStatus: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});
const Booking = mongoose.model("booking", bookingSchema);
export default Booking; 