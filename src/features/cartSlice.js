import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  carts: [],
  totalQuantity: 0,
  currentFoodQuantity: 1,
};

const cartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    //Function to add item to cart
    addToCart(state, action) {
      state.totalQuantity += action.payload.quantity;
      const existingItem = state.carts.find((item) => item.id === action.payload.id);

      if (existingItem) {
        state.carts = state.carts.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        state.carts = [...state.carts, { ...action.payload, quantity: action.payload.quantity }];
      }
    },
    //Function to remove item from cart
    removeFromCart(state, action) {
      state.totalQuantity--;
      const existingItem = state.carts.find((item) => item.id === action.payload);

      if (existingItem.quantity === 1) {
        state.carts = state.carts.filter((item) => item.id !== action.payload.id);
      } else {
        state.carts = state.carts.map((item) =>
          item.id === action.payload.id
            ? { ...action.payload, quantity: action.payload.quantity - 1 }
            : action.payload
        );
      }
    },
    //Function to increase food quantity when pressing amount button
    increaseCurrentQuantity(state) {
      state.currentFoodQuantity++;
    },
    //Function to decrease food quantity when pressing amount button
    decreaseCurrentQuantity(state) {
      state.currentFoodQuantity--;
    },
    //Function to reset current food quantity
    resetCurrentQuantity(state) {
      state.currentFoodQuantity = 1;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  addToCart,
  removeFromCart,
  increaseCurrentQuantity,
  decreaseCurrentQuantity,
  resetCurrentQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
