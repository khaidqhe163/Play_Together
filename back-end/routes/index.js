import UserRouter from './UserRouter.js'
import ServiceRouter from './ServiceRouter.js'
const routes = (app) => {
    app.use('/api/user', UserRouter);
    app.use('/api/service', ServiceRouter);
}

export default routes