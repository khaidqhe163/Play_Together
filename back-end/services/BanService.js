import Booking from "../models/Booking.js";
import Ban from "../models/Ban.js";
import User from "../models/User.js";
const banUser = async (userId, endDate, reason) => {
    try {
        const player = await User.findOne({ _id: userId });
        let today;
        console.log(player.status);
        if (player.status === true) {
            const preBan = await getBanByUserId(userId);
            today = new Date(preBan.endTime);
        } else {
            today = new Date();
        }
        console.log(today);
        console.log(endDate);
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 7);
        const bookings = await Booking.find({
            playerId: userId,
            createdAt: {
                $gte: sevenDaysAgo,
                $lte: today
            },
            bookingStatus: { $in: [1, 0] }
        }).populate("hours");
        console.log(bookings.length);
        if (bookings.length !== 0) {
            const filterBookings = bookings.filter((b) => {
                if (b.hours.length !== 0) {
                    const date = new Date(b.hours[b.hours.length - 1].date).getTime();
                    const start = b.hours[0].start * 1000 * 60 * 60 + date;
                    if (start > today.getTime() && start < endDate.getTime()) {
                        return b;
                    }
                } else {
                    const start = new Date(b.createdAt).getTime();
                    if (start > today.getTime() && start < endDate.getTime()) {
                        return b;
                    }
                }
            })
            console.log("filterBoooking", filterBookings);
            if (filterBookings && filterBookings.length !== 0) {
                await Promise.all(filterBookings.map(async (f) => {
                    return await Booking.updateOne({ _id: f._id }, { $set: { bookingStatus: 3 } })
                }))
                await Promise.all(filterBookings.map(async (f) => {
                    return await User.updateOne({ _id: f.userId }, { $inc: { accountBalance: f.price } })
                }))
                await Promise.all(filterBookings.map(async (f) => {
                    return await User.updateOne({ _id: f.playerId }, { $inc: { accountBalance: -f.price } })
                }))
            }
        }
        const user = await User.findOneAndUpdate({ _id: userId }, { $set: { status: true } }, { new: true })
        const ban = await Ban.create({ userId: userId, startTime: today, endTime: endDate, reason: reason })
        return user;
    } catch (error) {
        throw new Error(error.toString());
    }
}

const getBanByUserId = async (id) => {
    try {
        const ban = await Ban.findOne({ userId: id, expired: false }).sort({ createdAt: -1 })
        return ban
    } catch (error) {
        throw new Error(error);
    }
}

export default {
    banUser,
    getBanByUserId
}