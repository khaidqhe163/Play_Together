import express from 'express'
import { BookingController } from '../controllers/index.js';
import jwt from '../middleware/jwt.js';
const BookingRouter = express.Router();

BookingRouter.get('/', BookingController.getTop10Lessees);

BookingRouter.get('/my-booking', jwt.verifyAccessToken, BookingController.getMyBooking);
BookingRouter.get('/booking-online', jwt.verifyAccessToken, BookingController.getBookingOnlineOfPlayer);
BookingRouter.get('/booking-schedule', jwt.verifyAccessToken, BookingController.getBookingScheduleOfPlayer);
BookingRouter.get('/booking-success', jwt.verifyAccessToken, BookingController.getListBookingSuccess);
// BookingRouter.get('/booking-online', BookingController.getBookingOnlineOfPlayer);
BookingRouter.put('/booking-online', jwt.verifyAccessToken, BookingController.changeStatusToProgress);
BookingRouter.post('/', BookingController.createBooking);
BookingRouter.post('/by-schedule', jwt.verifyAccessToken, BookingController.createBookingT);
BookingRouter.delete('/booking-online/:bookingId', BookingController.deleteBookingById);
BookingRouter.get("/private-booking/:id", BookingController.getBookingByPlayerId)
export default BookingRouter;