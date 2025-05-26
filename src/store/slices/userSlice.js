import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    clearUserDetails: (state) => {
      state.name = '';
      state.email = '';
    },
  },
});

export const { setUserDetails, clearUserDetails } = userSlice.actions;
export default userSlice.reducer;