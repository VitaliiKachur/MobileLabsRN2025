import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import PasswordResetScreen from "../screens/PasswordResetScreen";

const Stack = createNativeStackNavigator();

const UnauthenticatedStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ 
        headerShown: false,
        animation: 'slide_from_right'
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
      <Stack.Screen name="PasswordReset" component={PasswordResetScreen} />
    </Stack.Navigator>
  );
};

export default UnauthenticatedStack;