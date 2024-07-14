import { createSlice } from '@reduxjs/toolkit'
export const accessTokenAdminSlice = createSlice({
    name: 'accessTokenAdmin',
    initialState: {
        value: null
    },
    reducers: {
        setAccessTokenAdmin: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { setAccessTokenAdmin } = accessTokenAdminSlice.actions

export const accessTokenAdmin = (state) => state.accessTokenAdmin.value
export default accessTokenAdminSlice.reducer