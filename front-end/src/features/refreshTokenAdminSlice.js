import { createSlice } from '@reduxjs/toolkit'
export const refreshTokenAdminSlice = createSlice({
    name: 'refreshTokenAdmin',
    initialState: {
        value: null
    },
    reducers: {
        setRefreshTokenAdmin: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { setRefreshTokenAdmin } = refreshTokenAdminSlice.actions

export const refreshTokenAdmin = (state) => state.refreshTokenAdmin.value
export default refreshTokenAdminSlice.reducer