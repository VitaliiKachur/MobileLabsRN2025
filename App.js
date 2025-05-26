import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';
import { Text } from 'react-native';
import ProductListScreen from './src/screens/ProductListScreen';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Завантаження...</Text>} persistor={persistor}>
        <ProductListScreen />
      </PersistGate>
    </Provider>
  );
}