import Home from "../components/Home"
import Login from "../components/Login"
import Register from "../components/Register"
import ResetPassword from "../components/ResetPassword"
import SocialMediaLogin from "../components/SocialMediaLogin"
import StoryPage from "../pages/StoryPage"
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
        path: '/stories',
        element: StoryPage
    }
]

export default {
    routes
}