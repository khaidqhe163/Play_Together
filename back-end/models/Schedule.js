import mongoose, { Schema } from "mongoose";
import User from './User.js'
import Booking from './Booking.js'

const ScheduleSchema = new Schema({
    playerId: {
        type: Schema.Types.ObjectId,
        ref: User,
    },
    date: {
        type: Date,
    },
    start: {
        type: Number
    },
    end: {
        type: Number
    },
    bookingId: {
        type: Schema.Types.ObjectId,
        ref: Booking,
        default: null
    }
}, {
    timestamps: true
})

const Schedule = mongoose.model("schedule", ScheduleSchema);
export default Schedule;