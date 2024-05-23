import UserRouter from './UserRouter.js'
const routes = (app) => {
    app.use('/api/user', UserRouter)
}

export default routes