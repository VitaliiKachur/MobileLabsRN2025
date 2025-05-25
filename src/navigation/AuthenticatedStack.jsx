import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserProfileScreen from "../screens/UserProfileScreen";
import AccountManagementScreen from "../screens/AccountManagementScreen";

const Stack = createNativeStackNavigator();

const AuthenticatedStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="UserProfile"
      screenOptions={{ 
        headerShown: false,
        animation: 'slide_from_right'
      }}
    >
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />
      <Stack.Screen name="AccountManagement" component={AccountManagementScreen} />
    </Stack.Navigator>
  );
};

export default AuthenticatedStack;