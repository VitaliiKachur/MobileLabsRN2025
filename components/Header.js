import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

const Header = ({ title }) => {
  const theme = useTheme();

  return (
    <View style={[styles.header, { backgroundColor: theme.background }]}>
      <Image
        source={require("../assets/images/steam-steam.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      <TouchableOpacity>
        <Ionicons name="search" size={24} color={theme.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  logo: {
    width: 36,
    height: 36,
  },
  title: {
    fontSize: 28,
    fontWeight: "400",
    color: "white",
    marginLeft: 12, 
    flex: 1,
  },
});

export default Header;
