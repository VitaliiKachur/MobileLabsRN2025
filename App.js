import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import FileManagerScreen from './src/screens/FileManagerScreen';
import FileViewerScreen from './src/screens/FileViewerScreen';
import FileEditorScreen from './src/screens/FileEditorScreen';
import FileInfoScreen from './src/screens/FileInfoScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Файловий менеджер',
          }}
        />
        
        <Stack.Screen
          name="FileManager"
          component={FileManagerScreen}
          options={{
            title: 'Файли',
          }}
        />
        
        <Stack.Screen
          name="FileViewer"
          component={FileViewerScreen}
          options={{
            title: 'Перегляд файлу',
          }}
        />
        
        <Stack.Screen
          name="FileEditor"
          component={FileEditorScreen}
          options={{
            title: 'Редагування файлу',
            headerLeft: () => null, 
          }}
        />
        
        <Stack.Screen
          name="FileInfo"
          component={FileInfoScreen}
          options={{
            title: 'Інформація про файл',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}