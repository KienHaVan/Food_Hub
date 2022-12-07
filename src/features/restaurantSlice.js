import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchPopularRestaurantsApi,
  fetchRestaurantApi,
  addRestaurantApi,
} from '../api/restaurantApi';

export const fetchRestaurants = createAsyncThunk(
  'Restaurant/fetchAllRestaurants',
  async ({ areFeatured = false, category, searchTerm = '', sortCriteria = 'rating' }) => {
    return areFeatured
      ? await fetchPopularRestaurantsApi()
      : await fetchRestaurantApi(category, searchTerm, sortCriteria);
  }
);

export const addRestaurant = createAsyncThunk(
  'Restaurant/addRestaurant',
  async (data, thunkApi) => {
    return await addRestaurantApi(data);
  }
);

const initialState = {
  restaurants: [],
  isLoading: false,
};

const restaurantSlice = createSlice({
  name: 'Restaurant',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.restaurants = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        console.log('error', action.error.message);
      });
    builder
      .addCase(addRestaurant.fulfilled, (state, action) => {
        console.log('new restaurant added');
      })
      .addCase(addRestaurant.rejected, (state, action) => {
        console.log('error', action.error.message);
      });
  },
});

export default restaurantSlice.reducer;
