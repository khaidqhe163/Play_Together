import ReportReason from "../models/ReportReason.js";

const createReport = async ({ content, type }) => {
    try {
        const report = await ReportReason.create({ content, type })
        return report
    } catch (error) {
        throw new Error("Error fetch comments: " + error.message);
    }
}

const getAllReports = async () => {
    try {
        const reports = await ReportReason.find()
        return reports
    } catch (error) {
        throw new Error("Error fetch comments: " + error.message);
    }
}

const updateReportReason = async (reportReasonId, data) => {
    try {
        const updateReportReason = await ReportReason.findByIdAndUpdate(reportReasonId, data)
        return updateReportReason
    } catch (error) {
        throw new Error("Error fetch comments: " + error.message);
    }
}

const deleteReportReason = async (reportReasonId) => {
    try {
        const result = await ReportReason.findByIdAndDelete(reportReasonId)
        if (!result) {
            throw new Error('Report reason not found')
        }
        return result
    } catch (error) {
        throw new Error("Error fetch comments: " + error.message);
    }
}

const getPlayerReport = async () => {
    try {
        const reportReason = await ReportReason.find({ type: 2 });
        return reportReason;
    } catch (error) {
        throw new Error(error.toString());
    }
}
export default {
    createReport,
    getAllReports,
    updateReportReason,
    deleteReportReason,
    getPlayerReport
}