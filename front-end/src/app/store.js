import { configureStore } from '@reduxjs/toolkit'
import dropdownReducer from '../features/dropdownSlice'
import userReducer from '../features/userSlice'
import accessTokenReducer from '../features/accessTokenSlice'
import refreshTokenReducer from '../features/refreshTokenSlice'
import serviceReducer from '../features/serviceSlice'
import socketSlice from '../features/socketSlice'
import onlineUserSlice from '../features/onlineUserSlice'
import navReducer from "../features/navSlice"
import adminReducer from '../features/adminInfoSlice'
import accessTokenAdminSlice from '../features/accessTokenAdminSlice'
import refreshTokenAdminSlice from '../features/refreshTokenAdminSlice'
export default configureStore ({
    reducer: {
        user: userReducer,
        dropdown: dropdownReducer,
        accessToken: accessTokenReducer,
        refreshToken: refreshTokenReducer,
        service: serviceReducer,
        socket: socketSlice,
        onlineUser: onlineUserSlice,
        navigation: navReducer,
        admin: adminReducer,
        accessTokenAdmin: accessTokenAdminSlice,
        refreshTokenAdmin: refreshTokenAdminSlice     
    }
})