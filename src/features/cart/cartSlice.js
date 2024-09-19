import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    total: 0,
  },
  reducers: {
    addItemCart: (state, action) => {
      const { id, price, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push(action.payload)
      }
      state.total+= price * quantity
    },
    removeItemCart: (state, action) => {
      const { id } = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      state.total = calculateTotal(state.items);
    },
    increaseQuantity: (state, action) => {
      const { id } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity += 1;
      }
      state.total = calculateTotal(state.items);
    },
    decreaseQuantity: (state, action) => {
      const { id } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item) {
      }
      state.total = calculateTotal(state.items);
    },
    clearCart:(state) => {
      state.items = [];
      state.total = 0;
    }
  }
});

const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

export const { 
  addItemCart, 
  removeItemCart, 
  increaseQuantity, 
  decreaseQuantity, 
  clearCart 
} = cartSlice.actions;

export default cartSlice.reducer;
