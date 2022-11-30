import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import cartReducer from '../features/cartSlice';
import categoryReducer from '../features/categorySlice';
import restaurantSlice from '../features/restaurantSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    category: categoryReducer,
    restaurant: restaurantSlice,
  },
});
