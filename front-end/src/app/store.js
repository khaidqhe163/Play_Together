import { configureStore } from '@reduxjs/toolkit'
import dropdownReducer from '../features/dropdownSlice'
import userReducer from '../features/userSlice'
export default configureStore ({
    reducer: {
        user: userReducer,
        dropdown: dropdownReducer
    }
})