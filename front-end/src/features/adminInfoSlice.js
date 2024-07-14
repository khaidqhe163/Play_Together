import { createSlice } from '@reduxjs/toolkit'
export const adminInfoSlice = createSlice({
    name: 'admin',
    initialState: {
        value: null
    },
    reducers: {
        setAdminInfo: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { setAdminInfo } = adminInfoSlice.actions

export const adminInfor = (state) => state.admin.value
export default adminInfoSlice.reducer