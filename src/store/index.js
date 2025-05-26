import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';

import userSlice from './slices/userSlice';
import cartSlice from './slices/cartSlice';
import productsSlice from './slices/productsSlice';
import ordersSlice from './slices/ordersSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'cart', 'orders'], 
};

const rootReducer = combineReducers({
  user: userSlice,
  cart: cartSlice,
  products: productsSlice,
  orders: ordersSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/REGISTER',
        ],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;