import { BookingService, UserService } from "../services/index.js"

import dayjs from 'dayjs';

export const getTop10Lessees = async (req, res) => {
    try {
        const today = dayjs().endOf('day');
        const lastWeek = today.subtract(7, 'day').startOf('day');
        const result = await BookingService.getAllBooking([
            {
                $match: {
                    createdAt: {
                        $gte: lastWeek.toDate(),
                        $lte: today.toDate()
                    }
                }
            },
            {
                $group: {
                    _id: '$lessee',
                    totalPrice: { $sum: '$price' }
                }
            },
            {
                $sort: { totalPrice: -1 }
            },
            {
                $limit: 10
            },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'lesseeDetails'
                }
            },
            {
                $unwind: '$lesseeDetails'
            },
            {
                $project: {
                    _id: 0,
                    lesseeId: '$_id',
                    totalPrice: 1,
                    lesseeDetails: {
                        name: '$lesseeDetails.name',
                        email: '$lesseeDetails.email'
                    }
                }
            }
        ]);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

const createBooking = async (req, res) => {
    try {
        const time = new Date();
        const realTime = time.getTime();
        const { userId, playerId, price, hours, unit, bookingStatus } = req.body;
        const newBooking = await BookingService.getLatestBooking(playerId);
        if (newBooking) {
            const endTime = newBooking?.createdAt.getTime() + (newBooking.unit * 30 * 60 * 1000);
            const checked = realTime > endTime;
            if (!checked) return res.status(400).json({ error: "Hiện tại player này đang có lịch Duo. Vui lòng chờ đợi! ❌" });
        }
        const aUser = await UserService.findUserById(userId);
        const aPlayer = await UserService.getPlayerById(playerId);
        aUser.accountBalance -= parseInt(price);
        await aUser.save();
        aPlayer.accountBalance += (parseInt(price) * 0.9);
        await aPlayer.save();
        const { password, ...restUser } = aUser._doc;
        const aBooking = await BookingService.createBooking({ userId, playerId, price, hours, unit, bookingStatus });
        return res.status(201).json({ message: "Thuê thành công! ✔️", restUser });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error create booking', error });
    }
}

export default {
    getTop10Lessees,
    createBooking,
}
