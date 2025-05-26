import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';
import { Text, View, StyleSheet } from 'react-native';

function AppContent() {
  return (
    <View style={styles.container}>
      <Text>Ласкаво просимо до мого магазину!</Text>
    </View>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Завантаження...</Text>} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});