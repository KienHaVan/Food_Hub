import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllCategoriesApi } from '../api/categoryApi';

export const fetchAllCategories = createAsyncThunk('Category/fetchAllCategories', async () => {
  return await fetchAllCategoriesApi();
});

const initialState = {
  categories: [],
  isLoading: false,
};

const categorySlice = createSlice({
  name: 'Category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAllCategories.pending, (state, action) => {
        state.isLoading = true;
      });
  },
});

export default categorySlice.reducer;
