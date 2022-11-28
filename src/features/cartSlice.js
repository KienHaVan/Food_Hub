import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  carts: [],
};

const cartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingItem = state.carts.find((item) => item.id === action.payload.id);

      if (existingItem) {
        state.carts = state.carts.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        state.carts = [...state.carts, { ...action.payload, quantity: 1 }];
      }
    },
    removeFromCart(state, action) {
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
  },
  extraReducers: (builder) => {},
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
