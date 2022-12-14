import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCategoriesApi } from '../api/categoryApi';

export const fetchCategories = createAsyncThunk(
  'Category/fetchAllCategories',
  async (areFeatured = false, thunkApi) => {
    return await fetchCategoriesApi(areFeatured);
  }
);

const initialState = {
  categories: [],
  isLoading: false,
  isModalShown: false,
  searchTheme: 0,
};

const categorySlice = createSlice({
  name: 'Category',
  initialState,
  reducers: {
    toggleModal(state) {
      state.isModalShown = !state.isModalShown;
    },
    setSearchTheme(state, action) {
      state.searchTheme = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCategories.pending, (state, action) => {
        state.isLoading = true;
      });
  },
});

export const { toggleModal, setSearchTheme } = categorySlice.actions;
export default categorySlice.reducer;
