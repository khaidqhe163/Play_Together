import { createSlice } from '@reduxjs/toolkit'
export const socketSlice = createSlice({
    name: 'socket',
    initialState: {
        value: null
    },
    reducers: {
        setSocket: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { setSocket } = socketSlice.actions

export const socket = (state) => state.socket.value
export default socketSlice.reducer