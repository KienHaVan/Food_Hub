import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllCategoriesApi } from '../api/categoryApi';

export const fetchAllCategories = createAsyncThunk('Category/fetchAllCategories', async () => {
  return await fetchAllCategoriesApi();
});

const initialState = {
  categories: [],
};

const categorySlice = createSlice({
  name: 'Category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export default categorySlice.reducer;
