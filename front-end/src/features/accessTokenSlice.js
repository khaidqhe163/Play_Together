import { createSlice } from '@reduxjs/toolkit'
export const accessTokenSlice = createSlice({
    name: 'accessToken',
    initialState: {
        value: null
    },
    reducers: {
        setAccessToken: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { setAccessToken } = accessTokenSlice.actions

export const accessToken = (state) => state.accessToken.value
export default accessTokenSlice.reducer