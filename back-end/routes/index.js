import HomeRouter from './HomeRouter.js'
const routes = (app) => {
    app.use('/', HomeRouter)
}

export default routes