import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [], 
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.list.unshift(action.payload); 
    },
    clearOrders: (state) => {
      state.list = [];
    },
  },
});

export const { addOrder, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;