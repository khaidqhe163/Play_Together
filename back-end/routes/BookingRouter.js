import express from 'express'
import { BookingController } from '../controllers/index.js';

const BookingRouter = express.Router();

BookingRouter.get('/', BookingController.getTop10Lessees);
BookingRouter.post('/',BookingController.createBooking);
BookingRouter.post('/by-schedule',BookingController.createBookingT);

export default BookingRouter;