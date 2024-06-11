import express from 'express'
import { ScheduleController } from '../controllers/index.js';
import jwt from '../middleware/jwt.js';

const ScheduleRouter = express.Router();

ScheduleRouter.get('/', jwt.verifyAccessToken, ScheduleController.getListSchedule);
ScheduleRouter.post('/', jwt.verifyAccessToken, ScheduleController.createSchedule);

export default ScheduleRouter;