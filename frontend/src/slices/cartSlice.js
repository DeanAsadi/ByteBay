import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',

  initialState,

  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;

      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === newItem.id
      );

      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex] = newItem;
      } else {
        state.cartItems.push(newItem);
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;