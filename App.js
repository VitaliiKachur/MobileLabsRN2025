// App.js
import React from "react";
import { ThemeProvider as StyledProvider } from "styled-components/native";
import { ThemeProvider, useTheme } from "./theme/ThemeContext";
import MainNavigator from "./navigation/AppNavigator";

const ThemedApp = () => {
  const { theme } = useTheme();

  return (
    <StyledProvider theme={theme}>
      <MainNavigator />
    </StyledProvider>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}
