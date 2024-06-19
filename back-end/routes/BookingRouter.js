import express from 'express'
import { BookingController } from '../controllers/index.js';

const BookingRouter = express.Router();

BookingRouter.get('/', BookingController.getTop10Lessees);
BookingRouter.post('/',BookingController.createBooking);

export default BookingRouter;