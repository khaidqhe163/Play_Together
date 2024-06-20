import { createSlice } from "@reduxjs/toolkit";

export const navSlice = createSlice({
  name: "navigation",
  initialState: {
    activeButton: "home",
  },
  reducers: {
    setActiveButton: (state, action) => {
      state.activeButton = action.payload;
    },
  },
});

export const { setActiveButton } = navSlice.actions;
export const getNav = (state) => state.navigation.activeButton

export default navSlice.reducer;
