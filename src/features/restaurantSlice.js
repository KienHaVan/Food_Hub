import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllRestaurantsApi } from '../api/restaurantApi';

export const fetchAllRestaurants = createAsyncThunk('Restaurant/fetchAllRestaurants', async () => {
  return await fetchAllRestaurantsApi();
});

const initialState = {
  restaurants: [],
};

const restaurantSlice = createSlice({
  name: 'Restaurant',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRestaurants.fulfilled, (state, action) => {
        console.log('from slice', action.payload);
        state.restaurants = action.payload;
      })
      .addCase(fetchAllRestaurants.rejected, (state, action) => {
        console.log('error', action.error.message);
      });
  },
});

export default restaurantSlice.reducer;
