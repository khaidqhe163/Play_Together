import express from 'express'
import { ReportController } from '../controllers/index.js'
import jwt from '../middleware/jwt.js';
import multer from 'multer';
const ReportRouter = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/report/')
    },
    filename: function (req, file, cb) {
        cb(null, req.payload.id + Date.now() + file.originalname);
    }
})
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 20
    }
})
ReportRouter.post('/', ReportController.createReport)
ReportRouter.post('/getAllReports', ReportController.getAllReports)
ReportRouter.post("/report-player", jwt.verifyAccessToken, upload.array("images", 10), ReportController.createReportPlayer)
ReportRouter.get("/report-player", ReportController.getReportPlayer)
ReportRouter.get("/report-booking", ReportController.getReportBooking)
ReportRouter.get("/report-player/:id", ReportController.getReportPlayerById)
ReportRouter.get("/report-booking/:id", ReportController.getReportBookingById)
ReportRouter.post("/process-report-player", ReportController.processReportPlayer)
ReportRouter.post("/process-report-booking", ReportController.processReportBooking)
ReportRouter.post("/report-booking", jwt.verifyAccessToken, upload.array("images", 10), ReportController.createReportBooking)
export default ReportRouter