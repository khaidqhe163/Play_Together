import { configureStore } from '@reduxjs/toolkit'
import dropdownReducer from '../features/dropdownSlice'
import userReducer from '../features/userSlice'
import accessTokenReducer from '../features/accessTokenSlice'
import refreshTokenReducer from '../features/refreshTokenSlice'
import serviceReducer from '../features/serviceSlice'
import socketSlice from '../features/socketSlice'
import onlineUserSlice from '../features/onlineUserSlice'

export default configureStore ({
    reducer: {
        user: userReducer,
        dropdown: dropdownReducer,
        accessToken: accessTokenReducer,
        refreshToken: refreshTokenReducer,
        service: serviceReducer,
        socket: socketSlice,
        onlineUser: onlineUserSlice
    }
})