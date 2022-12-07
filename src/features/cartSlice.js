import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  carts: [],
  totalQuantity: 0,
  totalPrice: 0,
  currentFoodQuantity: 1,
};

const cartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    fetchCartFromDB(state, action) {
      state.carts = action.payload?.carts ? action.payload.carts : [];
      if (state.carts.length !== 0) {
        state.carts.forEach((item) => {
          state.totalQuantity += item.quantity;
          state.totalPrice += item.price * item.quantity;
        });
      } else {
        state.totalPrice = 0;
        state.totalQuantity = 0;
      }
    },
    //Function to add item to cart
    addToCart(state, action) {
      state.totalQuantity += action.payload.quantity;
      state.totalPrice +=
        action.payload.price * action.payload.quantity + action.payload.chosenAddon.price;
      const existingItem = state.carts.find((item) => item.id === action.payload.id);

      if (existingItem) {
        state.carts = state.carts.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        state.carts = [
          ...state.carts,
          { ...action.payload, quantity: action.payload.quantity, status: '0' },
        ];
      }
    },
    //Function to remove item from cart
    removeFromCart(state, action) {
      state.totalQuantity -= action.payload.quantity;
      state.totalPrice -= action.payload.price * action.payload.quantity;
      const existingItem = state.carts.find((item) => item.id === action.payload.id);

      if (existingItem.quantity === action.payload.quantity) {
        state.carts = state.carts.filter((item) => item.id !== action.payload.id);
      } else {
        state.carts = state.carts.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity - action.payload.quantity }
            : item
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
    //Function to reset cart status when user logs out
    resetCart(state) {
      state.carts = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
    initCartStatus(state) {
      state.carts.map((item) => {
        if (!item.status) {
          item.status = '0';
        }
      });
    },
    changeCartStatus(state, action) {
      state.carts.map((item) => {
        if (item.id === action.payload.id) {
          item.status = action.payload.status.toString();
        }
      });
    },
  },
  extraReducers: (builder) => {},
});

export const {
  fetchCartFromDB,
  addToCart,
  removeFromCart,
  increaseCurrentQuantity,
  decreaseCurrentQuantity,
  resetCurrentQuantity,
  resetCart,
  initCartStatus,
  changeCartStatus,
} = cartSlice.actions;
export default cartSlice.reducer;
