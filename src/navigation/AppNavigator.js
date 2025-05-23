import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import GameScreen from '../screens/GameScreen';
import TasksScreen from '../screens/TasksScreen';

const Tab = createBottomTabNavigator();

const SwipeWrapper = ({ children }) => {
  const navigation = useNavigation();

  const swipeGesture = Gesture.Pan()
    .onEnd((event) => {
      const { velocityX, translationX } = event;
      const swipeThreshold = 50; 
      const velocityThreshold = 500; 

      if (translationX > swipeThreshold && velocityX > velocityThreshold) {
        const currentRoute = navigation.getState()?.routes?.[navigation.getState()?.index]?.name;
        
        if (currentRoute === 'Tasks') {
          navigation.navigate('Game');
        }
      }
      else if (translationX < -swipeThreshold && velocityX < -velocityThreshold) {
        const currentRoute = navigation.getState()?.routes?.[navigation.getState()?.index]?.name;
        
        if (currentRoute === 'Game') {
          navigation.navigate('Tasks');
        }
      }
    });

  return (
    <GestureDetector gesture={swipeGesture}>
      <View style={{ flex: 1 }}>
        {children}
      </View>
    </GestureDetector>
  );
};

const GameScreenWrapper = (props) => (
  <SwipeWrapper>
    <GameScreen {...props} />
  </SwipeWrapper>
);

const TasksScreenWrapper = (props) => (
  <SwipeWrapper>
    <TasksScreen {...props} />
  </SwipeWrapper>
);

const AppNavigator = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Game') {
                iconName = focused ? 'game-controller' : 'game-controller-outline';
              } else if (route.name === 'Tasks') {
                iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#3b82f6',
            tabBarInactiveTintColor: '#6b7280',
            tabBarStyle: {
              backgroundColor: '#fff',
              borderTopWidth: 1,
              borderTopColor: '#e5e7eb',
              paddingBottom: 8,
              paddingTop: 8,
              height: 60,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '500',
            },
            headerStyle: {
              backgroundColor: '#3b82f6',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 18,
            },
            animationEnabled: true,
            swipeEnabled: true,
          })}
        >
          <Tab.Screen 
            name="Game" 
            component={GameScreenWrapper}
            options={{
              title: 'Гра',
              headerTitle: '🎯 Клікер Гра',
            }}
          />
          <Tab.Screen 
            name="Tasks" 
            component={TasksScreenWrapper}
            options={{
              title: 'Завдання',
              headerTitle: '📋 Завдання',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default AppNavigator;