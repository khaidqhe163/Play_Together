import Report from '../models/Report.js'

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

export default {
    createReport,
    getAllReports,
}