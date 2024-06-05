import express from 'express'
import { BookingController } from '../controllers/index.js';

const BookingRouter = express.Router();

BookingRouter.get('/', BookingController.getTop10Lessees);

export default BookingRouter;