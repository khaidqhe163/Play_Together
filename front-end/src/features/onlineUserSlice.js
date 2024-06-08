import { createSlice } from '@reduxjs/toolkit'
export const onlineUserSlice = createSlice({
    name: 'onlineUser',
    initialState: {
        value: null
    },
    reducers: {
        setOnlineUser: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { setOnlineUser } = onlineUserSlice.actions

export const onlineUser = (state) => state.onlineUser.value
export default onlineUserSlice.reducer