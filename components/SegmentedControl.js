import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "styled-components/native";

const SegmentedControl = ({ options = ["Open chats", "My friends"], selectedIndex, onChange }) => {
  const theme = useTheme();
  const [localSelectedIndex, setLocalSelectedIndex] = useState(selectedIndex || 0);

  const isDark = theme.mode === "dark"; 

  const handlePress = (index) => {
    setLocalSelectedIndex(index);
    onChange && onChange(index); 
  };

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: theme.inputBackground2,
          backgroundColor: "transparent",
        },
      ]}
    >
      {options.map((label, index) => {
        const isActive = localSelectedIndex === index;

        const backgroundColor = isActive
          ? theme.background2
          : theme.inputBackground;

        const textColor = isActive
          ? isDark
            ? "#FFFFFF"    
            : "#000000"    
          : isDark
          ? "#A0A0A0"     
          : "#666666";    

        return (
          <TouchableOpacity
            key={label}
            style={[
              styles.button,
              {
                backgroundColor,
                borderColor: theme.inputBackground,
                borderRightWidth: index < options.length - 1 ? 1 : 0,
              },
            ]}
            onPress={() => handlePress(index)}
          >
            <Text
              style={{
                color: textColor,
                fontWeight: isActive ? "600" : "400",
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    marginVertical: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SegmentedControl;
