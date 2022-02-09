/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    email: null,
    token: null,
    name: null,
    avatar: null,
  },
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.avatar = action.payload.avatar;
    },
    removeUser(state) {
      state.id = null;
      state.email = null;
      state.token = null;
      state.name = null;
      state.avatar = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
