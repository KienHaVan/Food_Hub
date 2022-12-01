import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllRestaurantsApi, addRestaurantApi } from '../api/restaurantApi';

export const fetchAllRestaurants = createAsyncThunk('Restaurant/fetchAllRestaurants', async () => {
  return await fetchAllRestaurantsApi();
});

export const addRestaurant = createAsyncThunk(
  'Restaurant/addRestaurant',
  async (data, thunkApi) => {
    return await addRestaurantApi(data);
  }
);

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
        state.restaurants = action.payload;
      })
      .addCase(fetchAllRestaurants.rejected, (state, action) => {
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
