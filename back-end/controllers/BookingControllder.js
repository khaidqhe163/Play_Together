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
        return res.status(201).json({ message: "Thuê thành công! ✔️", restUser, aBooking });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error create booking', error });
    }
}

const createBookingT = async (req, res) => {
    try {
        const { userId, playerId, price, hours, unit, bookingStatus } = req.body;
        // console.log(req.body);
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
        return res.status(201).json({ message: "Thuê thành công! ✔️", restUser, aBooking });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error create booking', error });
    }
}

const getBookingOnlineOfPlayer = async (req, res) => {
    try {
        const playerId = req.payload.id;
        // const playerId = "6651f21e079075c8a3da9d02";
        const allBooking = await BookingService.getBookingOnlineOfPlayer(playerId);
        const transformedBookings = allBooking.map(({ _id, userId, playerId, price, hours, unit, bookingStatus, createdAt, updatedAt, __v }) => ({
            _id,
            userId: userId._id,
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
        res.status(500).json({ message: 'Internal server error get booking', error });
    }
};

const getBookingScheduleOfPlayer = async (req, res) => {
    try {
        // const playerId = req.payload.id;
        const playerId = "6651fbbb25f49e2ff935d699";
        const listBooking = await BookingService.getBookingScheduleOfPlayer(playerId);
        const transformedBookings = await Promise.all(listBooking.map(async ({
            _id,
            userId,
            playerId,
            price,
            hours,
            unit,
            bookingStatus,
            createdAt,
            updatedAt,
            __v
        }) => {

            const transformedHours = await Promise.all(hours.map(async (scheduleId) => {
                const schedule = await ScheduleService.getScheduleById(scheduleId);
                return schedule;
            }));

            return {
                _id,
                username: userId.username,
                playerId,
                price,
                hours: transformedHours,
                unit,
                bookingStatus,
                createdAt,
                updatedAt,
                __v
            };
        }));

        return res.status(200).json(transformedBookings);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error get booking', error });
    }

};

const getMyBooking = async (req, res) => {
    try {
        const userId = req.payload.id;
        // const userId = "665755b517909fecabb76afe";
        const listBooking = await BookingService.getMyBooking(userId);
        const transformedBookings = await Promise.all(listBooking.map(async ({ _id, userId, playerId, price, hours, unit, bookingStatus, bookingReview, reported, createdAt, updatedAt, __v }) => {
            if (hours.length === 0) {
                return {
                    _id,
                    userId,
                    playerId: playerId._id,
                    username: playerId.username,
                    avatar: playerId.avatar,
                    price,
                    hours,
                    unit,
                    bookingStatus,
                    bookingReview: bookingReview ? bookingReview : null,
                    reported: reported ? reported : false,
                    createdAt,
                    updatedAt,
                    __v
                };
            } else {
                const transformedHours = await Promise.all(hours.map(async (scheduleId) => {
                    const schedule = await ScheduleService.getScheduleById(scheduleId);
                    return schedule;
                }));
                return {
                    _id,
                    userId,
                    playerId: playerId._id,
                    username: playerId.username,
                    avatar: playerId.avatar,
                    price,
                    hours: transformedHours,
                    unit,
                    bookingStatus,
                    bookingReview: bookingReview ? bookingReview : null,
                    reported: reported ? reported : false,
                    createdAt,
                    updatedAt,
                    __v
                };
            }
        }));
        return res.status(200).json(transformedBookings);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error get booking', error });

    }
}

const changeStatusToProgress = async (req, res) => {
    try {
        const { idBooking, status } = req.body;
        const playerId = req.payload.id;
        const now = new Date().getTime();
        let restU = {};
        const b = await BookingService.getBookingById(idBooking);
        const aPlayer = await UserService.getPlayerById(playerId);
        if (status == 1) {
            let createA = new Date(b.createdAt).getTime();
            createA += (5 * 60 * 1000);

            if (now > createA) {
                const d = await BookingService.deleteBookingById(idBooking);
                return res.status(400).json({ error: "Lịch này đã hết hạn! ❌📆", d });
            }

            // const aPlayer = await UserService.getPlayerById(playerId);
            aPlayer.accountBalance += (parseInt(b.price) * 0.9);
            await aPlayer.save();
            const { password, ...restUser } = aPlayer._doc;
            restU = restUser;
        } else if (status == 2) {
            // const playerInFor = await UserService.getPlayerById()

            const checkB = b.hours.length;
            if (!checkB) {
                let endTime = new Date(b.createdAt).getTime();
                endTime += (b.unit * 30 * 60 * 1000);
                const decision = now <= endTime;
                if (decision) return res.status(400).json({ error: "Bạn không thể hoàn thành trước thời gian kết thúc! ❌" });
                aPlayer.player.totalHiredHour += (parseInt(b.unit) / 2);
                await aPlayer.save();
            } else {
                const { _id,
                    userId,
                    playerId,
                    price,
                    hours,
                    unit,
                    bookingStatus,
                    createdAt,
                    updatedAt,
                    __v } = b;
                const transformedHours = await Promise.all(hours.map(async (scheduleId) => {
                    const schedule = await ScheduleService.getScheduleById(scheduleId);
                    return schedule;
                }));
                const newB = { ...b._doc, hours: transformedHours };

                const convertToMilliseconds = (date, hour) => {
                    const fullDate = new Date(date);
                    const hours = Math.floor(hour);
                    const minutes = (hour - hours) * 60;
                    fullDate.setHours(hours, minutes, 0, 0);
                    return fullDate.getTime();
                };

                const maxEndTimeInMilliseconds = Math.max(...newB.hours.map(hour =>
                    convertToMilliseconds(hour.date, hour.end)
                ));

                const isCurrentTimeValid = now <= maxEndTimeInMilliseconds;


                if (isCurrentTimeValid) return res.status(400).json({ error: "Bạn không thể hoàn thành trước thời gian kết thúc cc. ❌" });
                aPlayer.player.totalHiredHour += (parseInt(checkB) / 2);
                await aPlayer.save();
            }
        } else if (status == 3) {
            const { userId } = req.body;
            const aUser = await UserService.findUserById(userId);
            aUser.accountBalance += parseInt(b.price);
            await aUser.save();
            const { password, ...restUser } = aUser._doc;
            restU = restUser;
        }
        const u = await BookingService.changeStatusToProgress(idBooking, status);
        res.status(200).json({ message: "Chuyển trạng thái thành công! ✔️", u, restU });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error change booking online', error });
    }
};


const deleteBookingById = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const d = await BookingService.deleteBookingById(bookingId);
        res.status(200).json(d);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error delete booking online', error });
    }
};


const getListBookingSuccess = async (req, res) => {
    try {
        const userId = req.payload.id;
        const status = 2;
        const booking = await BookingService.getListBookingSuccess(userId, status);
        const transf = booking.map(b => {
            return {
                userName: b.userId.username,
                totalHiredHour: (b.hours.length + b.unit) / 2,
                price: b.price,
                createdAt: b.createdAt
            }
        })
        res.status(200).json(transf);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error get list booking success', error });
    }
}

export default {
    getTop10Lessees,
    createBooking,
    createBookingT,
    getBookingOnlineOfPlayer,
    changeStatusToProgress,
    getBookingScheduleOfPlayer,
    getMyBooking,
    deleteBookingById,
    getListBookingSuccess,
}
