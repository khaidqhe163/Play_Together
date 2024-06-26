import express from 'express'
import { ReportController } from '../controllers/index.js'

const ReportRouter = express.Router();

ReportRouter.post('/', ReportController.createReport)
ReportRouter.post('/getAllReports', ReportController.getAllReports)

export default ReportRouter