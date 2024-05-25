import Home from "../components/Home"
import Login from "../components/Login"
import Register from "../components/Register"
import ResetPassword from "../components/ResetPassword"
import SocialMediaLogin from "../components/SocialMediaLogin"
import HomePage from "../pages/HomePage"
const routes = [
    {
        path: '/',
        element: Home
    },
    {
        path: '/login',
        element: Login
    },
    {
        path: '/register',
        element: Register
    },
    {
        path: '/login-success/:token',
        element: SocialMediaLogin
    },
    {
        path: '/resetpassword/:token',
        element: ResetPassword
    },
    {
        path: '/home',
        element: HomePage
    }
]

export default {
    routes
}