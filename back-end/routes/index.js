import StoryRouter from './StoryRouter.js'
import UserRouter from './UserRouter.js'
import ServiceRouter from './ServiceRouter.js'
import BookingRouter from './BookingRouter.js'
import CommentRouter from './CommentRouter.js'

const routes = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/stories', StoryRouter)
    
    app.use('/api/service', ServiceRouter);
    app.use('/api/booking', BookingRouter)

    app.use('/api/comment', CommentRouter)
}
export default routes