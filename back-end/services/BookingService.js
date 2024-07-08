import Booking from '../models/Booking.js'

const getAllBooking = async () => {
    try {
        const allBooking = await Booking.find({});
        return allBooking;
    } catch (error) {
        throw new Error(error);
    }
};

const getLatestBooking = async (playerId) => {
    try {
        const latestBooking = await Booking.findOne({ playerId, bookingStatus: { $ne: 3 } }).sort({ createdAt: -1 }).exec();
        return latestBooking;
    } catch (error) {
        throw new Error(error);
    }
};

const createBooking = async (booking) => {
    try {
        const aBooking = await Booking.create(booking);
        return aBooking;
    } catch (error) {
        throw new Error(error);
    }
};

const getBookingOnlineOfPlayer = async (playerId) => {
    try {
        const allBooking = await Booking.find({ playerId, hours: [] }).populate("userId", "_id username");
        return allBooking;
    } catch (error) {
        throw new Error(error);
    }
};

const getBookingScheduleOfPlayer = async (playerId) => {
    try {
        const schedules = await Booking.find({
            playerId,
            hours: { $ne: [] }
        }).populate("userId", "-_id username");
        return schedules;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getMyBooking = async (userId) => {
    try {
        const b = await Booking.find({
            userId
        }).populate("playerId", "_id username avatar");
        return b;
    } catch (error) {
        throw new Error(error.message);

    }
}

const getBookingById = async (idBooking) => {
    try {
        const b = await Booking.findById(idBooking);
        return b;
    } catch (error) {
        throw new Error(error.message);
    }
};

const changeStatusToProgress = async (idBooking, status) => {
    try {
        const u = await Booking.findByIdAndUpdate(idBooking, { bookingStatus: status }, { new: true });
        return u;
    } catch (error) {
        throw new Error(error);
    }
};

const deleteBookingById = async (idBooking) => {
    try {
        const b = await Booking.findByIdAndDelete(idBooking);
        return b;
    } catch (error) {
        throw new Error(error.message);
    }
};

export default {
    getAllBooking,
    getLatestBooking,
    createBooking,
    getBookingOnlineOfPlayer,
    changeStatusToProgress,
    getBookingScheduleOfPlayer,
    getBookingById,
    getMyBooking,
    deleteBookingById,
}