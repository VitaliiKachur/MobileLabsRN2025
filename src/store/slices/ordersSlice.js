import { createSlice } from '@reduxjs/toolkit';

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    list: []
  },
  reducers: {
    addOrder: (state, action) => {
      const newOrder = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString('uk-UA'),
        items: action.payload.items,
        totalItems: action.payload.items.reduce((sum, item) => sum + item.quantity, 0),
        totalAmount: action.payload.totalAmount
      };
      state.list.unshift(newOrder); 
    },
    clearOrderHistory: (state) => {
      state.list = [];
    }
  }
});

export const { addOrder, clearOrderHistory } = ordersSlice.actions;
export default ordersSlice.reducer;