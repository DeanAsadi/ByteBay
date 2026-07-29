import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './slices/cartSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();

  localStorage.setItem(
    'cartItems',
    JSON.stringify(state.cart.cartItems)
  );
});

export default store;