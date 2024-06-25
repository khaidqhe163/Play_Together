import { ScheduleService } from '../services/index.js';

const createSchedule = async (req, res) => {
    try {
        const { date, startTime, endTime } = req.body;
        const playerId = req.payload.id;
        const isDuplicate = await ScheduleService.checkDuplicateSchedule(playerId, date, parseFloat(startTime), parseFloat(endTime));
        if (isDuplicate) {
            return res.status(400).json({ error: "Thời gian đã được đặt trước đó. ❌📆" });
        }
        const schedules = await ScheduleService.createSchedule({ playerId, date, startTime, endTime });
        res.status(201).json({ message: "Thiết lập thời gian thành công! ✔️📆", schedules });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getListSchedule = async (req, res) => {
    try {
        const playerId = req.payload.id;
        const schedules = await ScheduleService.getListSchedule(playerId);
        res.status(200).json(schedules);
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        });
    }
}
const getListScheduleByDay = async (req, res) => {
    try {
        const playerId = req.payload.id;
        const {date} = req.query;
        const schedules = await ScheduleService.getListScheduleByDay(playerId,date);
        res.status(200).json(schedules);
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        });
    }
}

const getListScheduleByDayOfPlayer = async (req, res) => {
    try {
        const {date, pid} = req.query;
        const schedules = await ScheduleService.getListScheduleByDay(pid,date);
        res.status(200).json(schedules);
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        });
    }
}

const deleteScheduleById = async (req, res) => {
    try {
        const {id} = req.params;
        const schedule = await ScheduleService.deleteScheduleById(id);
        res.status(200).json(schedule);
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        });
    }
}
export default {
    createSchedule,
    getListSchedule,
    getListScheduleByDay,
    deleteScheduleById,
    getListScheduleByDayOfPlayer,
}
