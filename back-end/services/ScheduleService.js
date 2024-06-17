// services/scheduleService.js
import Schedule from '../models/Schedule.js';

const getListSchedule = async (playerId) => {
    const schedules = await Schedule.find({ playerId });
    return schedules;
};
const getListScheduleByDay = async (playerId, date) => {
    const schedules = await Schedule.find({ playerId, date});
    return schedules;
};


const createSchedule = async ({ playerId, date, startTime, endTime }) => {
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
};

const checkDuplicateSchedule = async (playerId, date, startTime, endTime) => {
    const existingSchedules = await Schedule.find({ playerId, date });

    for (const schedule of existingSchedules) {
        if ((startTime >= schedule.start && startTime < schedule.end) ||
            (endTime > schedule.start && endTime <= schedule.end)) {
            return true;
        }
    }

    if(startTime>=endTime) return true;

    return false;
};
const deleteScheduleById = async (id) => {
    const schedule = await Schedule.findByIdAndDelete(id);
    return schedule;
};



export default {
    createSchedule,
    checkDuplicateSchedule,
    getListSchedule,
    getListScheduleByDay,
    deleteScheduleById,
};
