import { createSlice } from '@reduxjs/toolkit'
export const refreshTokenSlice = createSlice({
    name: 'refreshToken',
    initialState: {
        value: null
    },
    reducers: {
        setRefreshToken: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { setRefreshToken } = refreshTokenSlice.actions

export const refreshToken = (state) => state.refreshToken.value
export default refreshTokenSlice.reducer