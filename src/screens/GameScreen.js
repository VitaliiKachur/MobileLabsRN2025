import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function GameScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Екран гри</Text>
      <Button title="Перейти до завдань" onPress={() => navigation.navigate('Tasks')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24 },
});
