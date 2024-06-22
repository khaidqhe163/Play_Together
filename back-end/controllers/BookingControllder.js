import { BookingService, ScheduleService, UserService } from "../services/index.js"

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
        // const aPlayer = await UserService.getPlayerById(playerId);
        aUser.accountBalance -= parseInt(price);
        await aUser.save();
        // aPlayer.accountBalance += (parseInt(price) * 0.9);
        // await aPlayer.save();
        const { password, ...restUser } = aUser._doc;
        const aBooking = await BookingService.createBooking({ userId, playerId, price, hours, unit, bookingStatus });
        return res.status(201).json({ message: "Thuê thành công! ✔️", restUser });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error create booking', error });
    }
}

const createBookingT = async (req, res) => {
    try {
        const { userId, playerId, price, hours, unit, bookingStatus } = req.body;
        const aUser = await UserService.findUserById(userId);
        const aPlayer = await UserService.getPlayerById(playerId);
        aUser.accountBalance -= parseInt(price);
        await aUser.save();
        aPlayer.accountBalance += (parseInt(price) * 0.9);
        await aPlayer.save();
        const { password, ...restUser } = aUser._doc
        const aBooking = await BookingService.createBooking({ userId, playerId, price, hours, unit, bookingStatus });
        const lsBookSchedule = await Promise.all(
            hours.map(async (h) => {
                const scheduleU = await ScheduleService.updateBookingIdOfSchedule(aBooking._id, h);
                return scheduleU;
            })
        );

        const newData = { ...aBooking._doc, lsBookSchedule };
        return res.status(201).json({ message: "Thuê thành công! ✔️", restUser });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error create booking', error });
    }
}

const getBookingOnlineOfPlayer = async (req, res) => {
    try {
        // const playerId = req.payload.id;
        const playerId = "6651f21e079075c8a3da9d02";
        const allBooking = await BookingService.getBookingOnlineOfPlayer(playerId);
        const transformedBookings = allBooking.map(({ _id, userId, playerId, price, hours, unit, bookingStatus, createdAt, updatedAt, __v }) => ({
            _id,
            username: userId.username,
            playerId,
            price,
            hours,
            unit,
            bookingStatus,
            createdAt,
            updatedAt,
            __v
        }));
        return res.status(200).json(transformedBookings);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error create booking', error });
    }
};

const changeStatusToProgress = async (req, res) => {
    try {
        const { idBooking, status } = req.body;
        const u = await BookingService.changeStatusToProgress(idBooking, status);
        console.log(u);
        res.status(200).json({ message: "Chuyển trạng thái thành công", u });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error get booking online', error });
    }
};

export default {
    getTop10Lessees,
    createBooking,
    createBookingT,
    getBookingOnlineOfPlayer,
    changeStatusToProgress,
}
