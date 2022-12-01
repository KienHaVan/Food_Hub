import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllFoodApi, fetchPopularFoodApi, addFoodApi } from '../api/foodApi';

export const fetchAllFood = createAsyncThunk('Food/fetchAllFood', async () => {
  return await fetchPopularFoodApi();
});

export const addFood = createAsyncThunk('Food/addFood', async (data, thunkApi) => {
  return await addFoodApi(data);
});

const initialState = {
  food: [],
  isLoading: false,
};

const foodSlice = createSlice({
  name: 'Food',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFood.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFood.fulfilled, (state, action) => {
        state.food = action.payload;
        state.isLoading = false;
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
