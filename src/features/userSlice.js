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
    updateUserPayment: (state, action) => {
      state.currentUser.paymentMethod = [...state.currentUser.paymentMethod, action.payload];
    },
    initUserPayment: (state) => {
      state.currentUser.paymentMethod = [];
    },
  },
  extraReducers: (builder) => {},
});

export const { addCurrentUser, updateCurrentUser, updateUserPayment, initUserPayment } =
  userSlice.actions;
export default userSlice.reducer;
