import { createSlice } from '@reduxjs/toolkit';

const getCartItemsFromStorage = () => {
  try {
    const storedCartItems =
      localStorage.getItem('cartItems');

    return storedCartItems
      ? JSON.parse(storedCartItems)
      : [];
  } catch (error) {
    console.error(
      'Failed to load cart items from local storage:',
      error
    );

    return [];
  }
};

const initialState = {
  cartItems: getCartItemsFromStorage(),
};

const cartSlice = createSlice({
  name: 'cart',

  initialState,

  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;

      const existingItemIndex =
        state.cartItems.findIndex(
          (item) => item._id === newItem._id
        );

      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex] =
          newItem;
      } else {
        state.cartItems.push(newItem);
      }
    },

    removeFromCart: (state, action) => {
      state.cartItems =
        state.cartItems.filter(
          (item) => item._id !== action.payload
        );
    },

    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;