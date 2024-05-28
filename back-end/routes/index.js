import StoryRouter from './StoryRouter.js'
import UserRouter from './UserRouter.js'
import ServiceRouter from './ServiceRouter.js'
const routes = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/stories', StoryRouter)
    
    app.use('/api/service', ServiceRouter);
}
export default routes