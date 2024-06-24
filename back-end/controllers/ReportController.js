import { ReportService } from "../services/index.js";

const createReport = async (req, res) => {
    try {
        const {description, screenShot, reportReason, title, owner, storyId, accused} = req.body
        
        const data = {}
        if (description) data.description = description
        if (screenShot) data.screenShot = screenShot
        if (reportReason) data.reportReason = reportReason
        if (title) data.title = title
        if (owner) data.owner = owner
        if (storyId) data.storyId = storyId
        if (accused) data.accused = accused

        if (Object.keys(data).length === 0) {
            return res.status(400).json({ message: 'Report empty?' });
        } 

        const report = await ReportService.createReport(data);
        res.status(201).json(report);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getAllReports = async (req, res) => {
    try {
        const reports = await ReportService.getAllReports()
        res.status(200).json({reports})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default {
    createReport,
    getAllReports,
}