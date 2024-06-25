import express from 'express'
import { ReportReasonController } from '../controllers/index.js';


const ReportReasonRouter = express.Router();

ReportReasonRouter.post('/', ReportReasonController.createReport)
ReportReasonRouter.post('/getAllReportsReason', ReportReasonController.getAllReports)
ReportReasonRouter.put('/:reportReasonId', ReportReasonController.updateReportReason)
ReportReasonRouter.delete('/:reportReasonId', ReportReasonController.deleteReportReason)


export default ReportReasonRouter