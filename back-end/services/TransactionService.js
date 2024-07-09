import Payment from '../models/Payment.js';
import Donate from '../models/Donate.js';
import Booking from '../models/Booking.js';

const getTransactionsByUserId = async (userId) => {
    try {
        const payments = await Payment.find({ userId }).populate("userId", "username");
        const donatesByUser = await Donate.find({ userId }).populate("playerId", "username");
        const donatesByPlayer = await Donate.find({ playerId: userId }).populate("userId", "username");
        const bookingsByUser = await Booking.find({ userId }).populate("playerId", "username");
        const bookingsByPlayer = await Booking.find({ playerId: userId }).populate("userId", "username");

        const transactions = [];

        payments.forEach(payment => {
            const paymentObj = payment.toObject();
            const { userId, money, createdAt } = paymentObj;
            transactions.push({ userName: userId.username, money, createdAt, status: 0 });
        });

        donatesByUser.forEach(donate => {
            const donateObj = donate.toObject();
            const { playerId, money, createdAt } = donateObj;
            transactions.push({ userName: playerId.username, money, createdAt, status: 1 });
        });

        donatesByPlayer.forEach(donate => {
            const donateObj = donate.toObject();
            const { userId, money, createdAt } = donateObj;
            transactions.push({ userName: userId.username, money, createdAt, status: 2 });
        });

        bookingsByUser.forEach(booking => {
            const bookingObj = booking.toObject();
            const { playerId, createdAt } = bookingObj;
            transactions.push({ userName: playerId.username, money: booking.price, createdAt, status: 3 });
        });

        bookingsByPlayer.forEach(booking => {
            const bookingObj = booking.toObject();
            const { userId, createdAt } = bookingObj;
            transactions.push({ userName: userId.username, money: booking.price, createdAt, status: 4 });
        });

        return transactions;
    } catch (error) {
        throw new Error(error.toString());
    }
};

export default {
    getTransactionsByUserId,
};
