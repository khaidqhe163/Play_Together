import Booking from '../models/Booking.js'

const getAllBooking = async () => {
    try {
        const allBooking = await Booking.find({});
        return allBooking;
    } catch (error) {
        throw new Error(error);
    }
}

export default{
    getAllBooking,
}