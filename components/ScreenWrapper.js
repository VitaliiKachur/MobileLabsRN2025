import React from "react";
import { View } from "react-native";
import { useTheme } from "styled-components/native";

const ScreenWrapper = ({ children }) => {
  const theme = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: theme.background, padding: 20 }}>
      {children}
    </View>
  );
};

export default ScreenWrapper;
