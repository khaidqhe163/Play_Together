import StoryRouter from './StoryRouter.js'
import UserRouter from './UserRouter.js'
import ServiceRouter from './ServiceRouter.js'
import BookingRouter from './BookingRouter.js'
import PlaymentRouter from './PaymentRouter.js'
const routes = (app) => {
    app.use('/api/user', UserRouter);
    app.use('/api/stories', StoryRouter);
    
    app.use('/api/service', ServiceRouter);
    app.use('/api/booking', BookingRouter);
    app.use('/api/payment', PlaymentRouter);
}
export default routes