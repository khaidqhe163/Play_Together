import express from 'express'
import { PaymentController } from '../controllers/index.js';
import jwt from '../middleware/jwt.js';

const PlaymentRouter = express.Router();

PlaymentRouter.post('/', jwt.verifyAccessToken, PaymentController.createPayment);
PlaymentRouter.post('/getAll', PaymentController.getAll);

export default PlaymentRouter;