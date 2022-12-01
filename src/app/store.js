import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import cartReducer from '../features/cartSlice';
import categoryReducer from '../features/categorySlice';
import restaurantReducer from '../features/restaurantSlice';
import foodReducer from '../features/foodSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    category: categoryReducer,
    restaurant: restaurantReducer,
    food: foodReducer,
  },
});
