
import Login from "../components/Login"
import Register from "../components/Register"
import ResetPassword from "../components/ResetPassword"
import SocialMediaLogin from "../components/SocialMediaLogin"
import ChangePasswordPage from "../pages/ChangePasswordPage"
import HomePage from "../pages/HomePage"
import PlayerProfile from "../pages/PlayerProfile"
import ProfilePage from "../pages/ProfilePage"
import StoryPage from "../pages/StoryPage"
import CustomerHistoryPage from "../pages/CustomerHistoryPage"
import PlayerSettingPage from "../pages/PlayerSettingPage"
import PlayerHistoryPage from "../pages/PlayerHistoryPage"
import PlayerSettingDuoPage from "../pages/PlayerSettingDuoPage"
import PlayerBlockListPage from "../pages/PlayerBlockListPage"
import PlayerGuidePage from "../pages/PlayerGuidePage"
import PlayerSchedulePage from "../pages/PlayerSchedulePage"
import Home from "../components/Home"
import ImageGallery from "../components/ImageGallery"
const routes = [
    {
        path: '/',
        element: HomePage
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
        element: ImageGallery
    },
    {
        path: '/stories',
        element: StoryPage
    },
    {
        path: '/player-profile/:id',
        element: PlayerProfile,
    },
    {
        path: '/profile',
        element: ProfilePage
    },
    {
        path: '/change-password',
        element: ChangePasswordPage
    },
    {
        path: '/customer-history',
        element: CustomerHistoryPage
    },
    {
        path: '/player-setting',
        element: PlayerSettingPage
    },
    {
        path: '/player-history',
        element: PlayerHistoryPage
    },
    {
        path: '/player-setting-duo',
        element: PlayerSettingDuoPage
    },
    {
        path: '/player-block-list',
        element: PlayerBlockListPage
    },
    {
        path: '/player-guide',
        element: PlayerGuidePage
    }
    ,
    {
        path: '/player-schedule',
        element: PlayerSchedulePage
    }
]
export default {
    routes
}