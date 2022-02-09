/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const utilsSlice = createSlice({
  name: 'utils',
  initialState: {
    currentPage: '',
    headerSearchValue: '',
    theme: 'dark',
  },
  reducers: {
    changeCurrentPage(state, action) {
      state.currentPage = action.payload.currentPage;
    },
    changeSearchValue(state, action) {
      state.headerSearchValue = action.payload.headerSearchValue;
    },
    changeTheme(state, action) {
      state.theme = action.payload.theme;
    },
  },
});

export const { changeCurrentPage, changeSearchValue, changeTheme } =
  utilsSlice.actions;
export default utilsSlice.reducer;
