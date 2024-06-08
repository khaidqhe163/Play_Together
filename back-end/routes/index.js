import StoryRouter from './StoryRouter.js'
import UserRouter from './UserRouter.js'
import ServiceRouter from './ServiceRouter.js'
import BookingRouter from './BookingRouter.js'
import PlaymentRouter from './PaymentRouter.js'
import CommentRouter from './CommentRouter.js'
import MessageRouter from './MessageRouter.js'
import ConversationRouter from './ConversationRouter.js'

const routes = (app) => {
    app.use('/api/user', UserRouter);
    app.use('/api/stories', StoryRouter);
    
    app.use('/api/service', ServiceRouter);
    app.use('/api/booking', BookingRouter);
    app.use('/api/payment', PlaymentRouter);

    app.use('/api/comment', CommentRouter)
    app.use('/api/message', MessageRouter)
    app.use('/api/conversation', ConversationRouter)
}
export default routes