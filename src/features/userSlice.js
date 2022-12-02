import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: {},
};

const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    addCurrentUser: (state, action) => {
      state.currentUser = { ...action.payload };
    },
    updateCurrentUser: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
  },
  extraReducers: (builder) => {},
});

export const { addCurrentUser, updateCurrentUser } = userSlice.actions;
export default userSlice.reducer;
