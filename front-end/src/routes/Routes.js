import Home from "../components/Home"
import Login from "../components/Login"
import Register from "../components/Register"
import SocialMediaLogin from "../components/SocialMediaLogin"
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
    }
]

export default {
    routes
}