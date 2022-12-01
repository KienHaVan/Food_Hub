import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllFoodApi, addFoodApi } from '../api/foodApi';

export const fetchAllFood = createAsyncThunk('Food/fetchAllFood', async () => {
  return await fetchAllFoodApi();
});

export const addFood = createAsyncThunk('Food/addFood', async (data, thunkApi) => {
  return await addFoodApi(data);
});

const initialState = {
  food: [],
};

const foodSlice = createSlice({
  name: 'Food',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFood.fulfilled, (state, action) => {
        console.log('food slice', action.payload);
        state.food = action.payload;
      })
      .addCase(fetchAllFood.rejected, (state, action) => {
        console.log('error', action.error.message);
      });
    builder
      .addCase(addFood.fulfilled, (state, action) => {
        console.log('new food added');
      })
      .addCase(addFood.rejected, (state, action) => {
        console.log('error', action.error.message);
      });
  },
});

export default foodSlice.reducer;
