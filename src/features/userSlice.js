import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUserById, updateUserApi } from '../api/userApi';

export const getFireStoreUserData = createAsyncThunk('User/getFireStoreUserData', async (id) => {
  return await fetchUserById(id);
});

export const updateUser = createAsyncThunk('User/updateUser', async (data, thunkApi) => {
  return await updateUserApi(data.userId, data.newData);
});

const initialState = {
  currentUser: {},
  currentUserFirestoreData: {},
  favoriteFoodList: [],
  favoriteRestaurantList: [],
  isLoading: false,
};

const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    addCurrentUser: (state, action) => {
      return { ...state, currentUser: { ...action.payload } };
    },
    updateCurrentUser: (state, action) => {
      state.currentUserFirestoreData = { ...state.currentUser, ...action.payload };
    },
    updateUserPayment: (state, action) => {
      state.currentUser.paymentMethod = [...state.currentUser.paymentMethod, action.payload];
    },
    initUserPayment: (state) => {
      state.currentUser.paymentMethod = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFireStoreUserData.fulfilled, (state, action) => {
        state.currentUserFirestoreData = action.payload;
      })
      .addCase(updateUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { addCurrentUser, updateCurrentUser, updateUserPayment, initUserPayment } =
  userSlice.actions;
export default userSlice.reducer;
