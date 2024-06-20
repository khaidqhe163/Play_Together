import express from 'express'
import { ScheduleController } from '../controllers/index.js';
import jwt from '../middleware/jwt.js';

const ScheduleRouter = express.Router();

ScheduleRouter.get('/', jwt.verifyAccessToken, ScheduleController.getListScheduleByDay);
ScheduleRouter.get('/user', ScheduleController.getListScheduleByDayOfPlayer);
ScheduleRouter.post('/', jwt.verifyAccessToken, ScheduleController.createSchedule);
ScheduleRouter.delete('/:id', jwt.verifyAccessToken, ScheduleController.deleteScheduleById);

export default ScheduleRouter;