import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUserById } from '../api/userApi';
import { addUserToFirebaseWithID } from '../utils/authentication';

export const getFireStoreUserData = createAsyncThunk('User/getFireStoreUserData', async (id) => {
  return await fetchUserById(id);
});

const initialState = {
  currentUser: {},
  currentUserFirestoreData: {},
  favoriteFoodList: [],
  favoriteRestaurantList: [],
};

const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    addCurrentUser: (state, action) => {
      return { ...state, currentUser: { ...action.payload } };
    },
    updateCurrentUser: (state, action) => {
      state.currentUserFirestoreData = { ...state.currentUser, ...action.payload };
    },
    addToFavoriteFoodList: (state, action) => {
      return { ...state, favoriteFoodList: [...state.favoriteFoodList, action.payload] };
    },
    removeToFavoriteFoodList: (state, action) => {
      const newList = [...state.favoriteFoodList];
      newList.splice(action.payload, 1);
      return { ...state, favoriteFoodList: [...newList] };
    },
    addToFavoriteRestaurantList: (state, action) => {
      return {
        ...state,
        favoriteRestaurantList: [...state.favoriteRestaurantList, action.payload],
      };
    },
    removeToFavoriteRestaurantList: (state, action) => {
      const newList = [...state.favoriteRestaurantList];
      newList.splice(action.payload, 1);
      return { ...state, favoriteRestaurantList: [...newList] };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFireStoreUserData.fulfilled, (state, action) => {
      state.currentUserFirestoreData = action.payload;
    });
  },
});

export const {
  addCurrentUser,
  updateCurrentUser,
  addToFavoriteFoodList,
  removeToFavoriteFoodList,
  addToFavoriteRestaurantList,
  removeToFavoriteRestaurantList,
} = userSlice.actions;
export default userSlice.reducer;
