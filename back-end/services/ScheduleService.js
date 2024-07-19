// services/scheduleService.js
import Schedule from '../models/Schedule.js';

const getListSchedule = async (playerId) => {
    try {
        const schedules = await Schedule.find({ playerId });
        return schedules;
    } catch (error) {
        throw new Error(error);
    }
};
const getListScheduleByDay = async (playerId, date) => {
    try {
        const schedules = await Schedule.find({ playerId, date });
        return schedules;
    } catch (error) {
        throw new Error(error);
    }
};

const getScheduleById = async (id) => {
    try {
        const schedule = await Schedule.findById(id).select("start end date");
        return schedule;
    } catch (error) {
        throw new Error(error);
    }
};


const createSchedule = async ({ playerId, date, startTime, endTime }) => {
    try {
        const schedules = [];
        // const parsedDate = new Date(date);  
        let start = parseFloat(startTime);
        const end = parseFloat(endTime);

        while (start < end) {
            let nextEnd = start + 0.5;
            if (nextEnd >= end) {
                nextEnd = end;
            }

            const newSchedule = await Schedule.create({
                playerId,
                date,
                start,
                end: nextEnd
            });

            schedules.push(newSchedule);
            start = nextEnd;
        }

        return schedules;
    } catch (error) {
        throw new Error(error);
    }
};

const checkDuplicateSchedule = async (playerId, date, startTime, endTime) => {
    try {
        const existingSchedules = await Schedule.find({ playerId, date });

        for (const schedule of existingSchedules) {
            if ((startTime >= schedule.start && startTime < schedule.end) ||
                (endTime > schedule.start && endTime <= schedule.end)) {
                return true;
            }
        }

        if (startTime >= endTime) return true;

        return false;
    } catch (error) {
        throw new Error(error);
    }
};
const deleteScheduleById = async (id) => {
    try {
        const schedule = await Schedule.findByIdAndDelete(id);
        return schedule;
    } catch (error) {
        throw new Error(error);
    }
};

const updateBookingIdOfSchedule = async (bookingId, scheduleId) => {
    try {
        const scheduleUpdate = await Schedule.findByIdAndUpdate(
            scheduleId,
            {
                bookingId: bookingId
            },
            { new: true }
        );
        return scheduleUpdate;
    } catch (error) {
        throw new Error(error);
    }
};


const checkScheduleBookingExist = async (scheduleId) => {
    try {
        const scheduleBookingExist = await Schedule.findOne({ _id: scheduleId}).exec();
        if(scheduleBookingExist.bookingId !== null){
            return true;
        }
        return false;
    } catch (error) {
        throw new Error(error);
    }
};




export default {
    createSchedule,
    checkDuplicateSchedule,
    getListSchedule,
    getListScheduleByDay,
    deleteScheduleById,
    updateBookingIdOfSchedule,
    getScheduleById,
    checkScheduleBookingExist,
};
