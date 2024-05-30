// src/redux/slices/dropdownSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const dropdownSlice = createSlice({
    name: 'dropdown',
    initialState: {
        isAccountDropdownOpen: false,
        isPlayerDropdownOpen: false,
    },
    reducers: {
        toggleAccountDropdown: (state) => {
            state.isAccountDropdownOpen = !state.isAccountDropdownOpen;
        },
        togglePlayerDropdown: (state) => {
            state.isPlayerDropdownOpen = !state.isPlayerDropdownOpen;
        },
    },
});

export const { toggleAccountDropdown, togglePlayerDropdown } = dropdownSlice.actions;

export const selectDropdownState = (state) => state.dropdown;

export default dropdownSlice.reducer;
