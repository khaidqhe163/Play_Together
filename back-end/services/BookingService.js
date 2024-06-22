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
        const latestBooking = await Booking.findOne({playerId}).sort({ createdAt: -1 }).exec();
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
        const allBooking = await Booking.find({playerId}).populate("userId", "-_id username");
        return allBooking;
    } catch (error) {
        throw new Error(error);
    }
}

export default {
    getAllBooking,
    getLatestBooking,
    createBooking,
    getBookingOnlineOfPlayer,
}