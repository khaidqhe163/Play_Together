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
const getBookingByReport = async (idBooking) => {
    try {
        console.log(idBooking);
        const b = await Booking.findOne({ _id: idBooking }).populate("playerId", "username");
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

const getListBookingSuccess = async (userId) => {
    try {
        const b = await Booking.find({ playerId: userId, bookingStatus: { $in: [2, 4] } }).populate("userId", "username").exec();
        return b;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getBookingByPlayerId = async (playerId) => {
    try {
        const b = await Booking.find({ playerId: playerId, bookingStatus: { $in: [3, 4] } });
        return b;
    }
    catch (error) {
        throw new Error(error);
    }
}
const getAll = async () => {
    try {
        const allBooking = await Booking.find({});
        return allBooking;
    } catch (error) {
        throw new Error(error);
    }
}

const getTopBookers = async (period) => {
    const now = new Date();
    let startDate;

    if (period === 'week') {
        startDate = new Date(now.setDate(now.getDate() - now.getDay()));
    } else if (period === 'month') {
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    } else {
        throw new Error('Invalid period specified. Use "week" or "month".');
    }

    return Booking.aggregate([
        {
            $match: {
                createdAt: { $gte: startDate }
            }
        },
        {
            $group: {
                _id: '$userId',
                totalBookings: { $sum: '$price' }
            }
        },
        {
            $sort: { totalBookings: -1 }
        },
        {
            $limit: 10
        },
        {
            $lookup: {
                from: 'users',
                localField: '_id',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $unwind: '$user'
        },
        {
            $project: {
                userId: '$_id',
                totalBookings: 1,
                'user.username': 1,
                'user.email': 1,
                'user.avatar': 1
            }
        }
    ]);
};

const getBookingDirectLasterOfPlayer = async(playerId)=>{
    try {
        const b = await Booking.findOne({ playerId, unit: {$ne:0}}).sort({ createdAt: -1 }).exec();
        return b;
    } catch (error) {
        throw new Error(error);
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
    getListBookingSuccess,
    getBookingByReport,
    getBookingByPlayerId,
    getAll,
    getTopBookers,
    getBookingDirectLasterOfPlayer,
}