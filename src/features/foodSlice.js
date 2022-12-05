import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFoodApi, fetchPopularFoodApi, addFoodApi } from '../api/foodApi';

export const fetchFood = createAsyncThunk(
  'Food/fetchAllFood',
  async ({ areFeatured = false, category, searchTerm = '', sortCriteria = 'rating' }, thunkApi) => {
    console.log('are featured?', areFeatured);
    console.log('category?', category);
    console.log('search term?', searchTerm);
    console.log('sort criteria?', sortCriteria);
    return areFeatured
      ? await fetchPopularFoodApi()
      : await fetchFoodApi(category, searchTerm, sortCriteria);
  }
);

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
      .addCase(fetchFood.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchFood.fulfilled, (state, action) => {
        state.food = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchFood.rejected, (state, action) => {
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
