import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthenticationProvider, useAuthentication } from "./src/contexts/AuthenticationContext";
import UnauthenticatedStack from "./src/navigation/UnauthenticatedStack";
import AuthenticatedStack from "./src/navigation/AuthenticatedStack";
import { View, ActivityIndicator } from "react-native";
import { globalStyles } from "./src/styles/globalStyles";

const AppContent = () => {
  const { currentUser, isLoading } = useAuthentication();

  if (isLoading) {
    return (
      <View style={globalStyles.centeredContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {currentUser ? <AuthenticatedStack /> : <UnauthenticatedStack />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthenticationProvider>
      <AppContent />
    </AuthenticationProvider>
  );
}