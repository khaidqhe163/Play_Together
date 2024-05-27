import StoryRouter from './StoryRouter.js'
import UserRouter from './UserRouter.js'

const routes = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/stories', StoryRouter)
}

export default routes