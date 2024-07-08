import { ReportReasonService } from "../services/index.js"

const createReport = async (req, res) => {
    try {
        const {content, type} = req.body
        const report = await ReportReasonService.createReport( {content, type} )
        res.status(200).json({ mesage: "Report created successfully!", report})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllReports = async (req, res) => {
    try {
        const reports = await ReportReasonService.getAllReports()
        res.status(200).json({reports})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const updateReportReason = async (req, res) => {
    const { reportReasonId } = req.params
    const data = req.body

    try {
        const updateReasonReport = await ReportReasonService.updateReportReason(reportReasonId, data) 
        if (!updateReasonReport) {
            return res.status(404).json({ message: 'Report not found' })
        }
        return res.status(200).json(updateReasonReport)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const deleteReportReason = async (req, res) => {
    const { reportReasonId } = req.params
    
    try {
        const result = await ReportReasonService.deleteReportReason(reportReasonId)
        return res.status(200).json({
            message: 'Report reason deleted successfully',
            data: result,
        });
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export default {
    createReport,
    getAllReports,
    updateReportReason,
    deleteReportReason,
}