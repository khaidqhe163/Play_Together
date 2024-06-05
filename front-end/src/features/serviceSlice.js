import { createSlice } from '@reduxjs/toolkit'

const serviceSlide = createSlice({
    name: "service",
    initialState: {
        service: null
    },
    reducers: {
        setService: (state, action) => {
            state.service = action.payload;
        }
    }
})
export const { setService } = serviceSlide.actions;
export const getService = (state) => state.service.service
export default serviceSlide.reducer;