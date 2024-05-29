import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import accessTokenReducer from '../features/accessTokenSlice'
import refreshTokenReducer from '../features/refreshTokenSlice'
export default configureStore ({
    reducer: {
        user: userReducer,
        accessToken: accessTokenReducer,
        refreshToken: refreshTokenReducer
    }
})