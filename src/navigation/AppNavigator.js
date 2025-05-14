import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GameScreen from '../screens/GameScreen';
import TasksScreen from '../screens/TasksScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Game">
        <Stack.Screen name="Game" component={GameScreen} options={{ title: 'Гра' }} />
        <Stack.Screen name="Tasks" component={TasksScreen} options={{ title: 'Завдання' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
