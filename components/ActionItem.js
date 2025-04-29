import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeContext";

const ActionItem = ({ title, onPress }) => {
    const { theme } = useTheme();
  
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.container, { backgroundColor: theme.card2 }]}>
          <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
          <Text style={[styles.arrow, { color: theme.text }]}>{">"}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      padding: 16,
      borderRadius: 10,
      marginVertical: 6,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: { fontSize: 16 },
    arrow: { fontSize: 16 },
  });
  

export default ActionItem;
