import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateUserApi } from '../api/userApi';

export const updateUser = createAsyncThunk('User/updateUser', async (data, thunkApi) => {
  return await updateUserApi(data.userId, data.newData);
});

const initialState = {
  currentUser: {},
  isLoading: false,
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
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { addCurrentUser, updateCurrentUser } = userSlice.actions;
export default userSlice.reducer;
