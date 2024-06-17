import { createSlice } from '@reduxjs/toolkit'
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: null
    },
    reducers: {
        setUserInformation: (state, action) => {
            state.value = action.payload;
        },
        updateBlockedUsers: (state, action) => {
            const { userId, blocked } = action.payload
            if (blocked) {
                if (!state.value.blockedUsers.includes(userId)) {
                    state.value.blockedUsers.push(userId)
                }
            } else {
                state.value.blockedUsers = state.value.blockedUsers.filter(id => id !== userId)
            }
        }
    }
})

export const { setUserInformation, updateBlockedUsers } = userSlice.actions

export const userInfor = (state) => state.user.value
export default userSlice.reducer