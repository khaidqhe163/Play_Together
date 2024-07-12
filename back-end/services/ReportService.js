import Booking from '../models/Booking.js'
import Report from '../models/Report.js'
import User from '../models/User.js'
import BanService from './BanService.js'
import ScheduleService from './ScheduleService.js'
const createReport = async (data) => {
    try {
        const report = await Report.create(data)
        return report
    } catch (error) {
        throw new Error("Error fetch comments: " + error.message);
    }
}

const getAllReports = async () => {
    try {
        const reports = await Report.find()
            .populate('reportReason', 'content type')
            .populate('owner', 'avatar username email')
            .populate('storyId', 'path thumbnail')
        return reports
    } catch (error) {
        throw new Error("Error fetch comments: " + error.message);
    }
}

const createReportPlayer = async (userId, screenShot, type, title, description, playerId) => {
    try {
        const report = await Report.create({ owner: userId, screenShot, title, reportReason: type, description, title, accused: playerId })
        return report;
    } catch (error) {
        throw new Error(error.toString);
    }
}

const getReportPlayer = async () => {
    try {
        const report = await Report.find({ storyId: { $exists: false }, bookingId: { $exists: false } }).populate("owner", "username").populate("reportReason", "content")
        return report
    } catch (error) {
        throw new Error(error.toString);
    }
}
const getReportBooking = async () => {
    try {
        const report = await Report.find({ bookingId: { $exists: true } }).populate("owner", "username").populate("reportReason", "content").sort({ createdAt: -1 })
        return report
    } catch (error) {
        throw new Error(error.toString);
    }
}
const getReportPlayerById = async (id) => {
    try {
        const report = await Report.findOne({ _id: id })
            .populate("owner", "username")
            .populate("reportReason", "content")
            .populate("accused", "username")
        return report
    } catch (error) {
        throw new Error(error.toString);
    }
}
const getReportBookingById = async (id) => {
    try {
        const report = await Report.findOne({ _id: id }).sort({
            createdAt: -1
        })
            .populate("owner", "username")
            .populate("reportReason", "content")
            .populate("bookingId")
            .populate("accused", "username");

        // console.log(report);

        return report
    } catch (error) {
        throw new Error(error.toString);
    }
}
const processReportPlayer = async (reportId, complaint, reason, playerId) => {
    try {
        let report;
        let endDate;
        if (complaint === 0) {
            report = await Report.findOneAndUpdate({ _id: reportId }, { status: 2, formsProcessing: "Đơn bị từ chối" }, { new: true })
        }
        if (complaint === 1) {
            report = await Report.findOneAndUpdate({ _id: reportId }, { status: 2, formsProcessing: "Cảnh cáo" }, { new: true })
        }
        if (complaint === 2) {
            report = await Report.findOneAndUpdate({ _id: reportId }, { status: 2, formsProcessing: "Cấm 3 ngày" }, { new: true })
            endDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
        }
        if (complaint === 3) {
            report = await Report.findOneAndUpdate({ _id: reportId }, { status: 2, formsProcessing: "Cấm 7 ngày" }, { new: true })
            endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        }
        if (complaint === 4) {
            report = await Report.findOneAndUpdate({ _id: reportId }, { status: 2, formsProcessing: "Cấm 1 tháng" }, { new: true })
            endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        }
        if (complaint === 5) {
            report = await Report.findOneAndUpdate({ _id: reportId }, { status: 2, formsProcessing: "Vĩnh viễn" }, { new: true })
            endDate = new Date(Date.now() + 100 * 365.25 * 24 * 60 * 60 * 1000);
        }
        if (complaint > 1) {
            await BanService.banUser(playerId, endDate, reason);
        }
        return report
    } catch (error) {
        throw new Error(error.toString);
    }
}
const processReportBooking = async (reportId, complaint, bookingId) => {
    try {
        let report;
        console.log("booking", bookingId);
        if (complaint === 0) {
            report = await Report.findOneAndUpdate({ _id: reportId }, { status: 2, formsProcessing: "Đơn bị từ chối" }, { new: true })
                .populate("owner", "username").populate("reportReason", "content")
        }
        if (complaint === 1) {
            report = await Report.findOneAndUpdate({ _id: reportId }, { status: 2, formsProcessing: "Hoàn tiền" }, { new: true })
                .populate("owner", "username").populate("reportReason", "content")
            const booking = await Booking.findOneAndUpdate({ _id: bookingId }, { $set: { bookingStatus: 4 } });
            await User.updateOne({ _id: booking.userId }, { $inc: { accountBalance: booking.price } })
            await User.updateOne({ _id: booking.playerId }, { $inc: { accountBalance: -booking.price } })
        }
        return report
    } catch (error) {
        throw new Error(error.toString);
    }
}

const createReportBooking = async (userId, screenShot, type, title, description, bookingId, playerId) => {
    try {
        const report = await Report.create({ owner: userId, accused: playerId, screenShot, title, reportReason: type, description, title, bookingId: bookingId })
        await Booking.updateOne({ _id: bookingId }, { $set: { reported: true } });
        return report;
    } catch (error) {
        throw new Error(error.toString);
    }
}
export default {
    createReport,
    getAllReports,
    createReportPlayer,
    getReportPlayer,
    getReportPlayerById,
    processReportPlayer,
    createReportBooking,
    getReportBooking,
    getReportBookingById,
    processReportBooking
}