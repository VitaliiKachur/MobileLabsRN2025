import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import SettingsList from "../components/SettingsList2";
import ScreenWrapper from "../components/ScreenWrapper";

const ProfileScreen = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <ScreenWrapper style={{ backgroundColor: theme.background }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.avatarContainer}>
          <Image
            source={require("../assets/images/profile.png")} 
            style={styles.avatar}
          />
          <View style={styles.onlineIndicator} />
        </View>

        <Text style={[styles.name, { color: theme.text }]}>Kachur Vitalii</Text>
        <Text style={[styles.group, { color: theme.text }]}>VTk-24-1</Text>

        <TouchableOpacity style={styles.toggleButton} onPress={toggleTheme}>
          <Text style={styles.toggleButtonText}>Toggle Theme</Text>
        </TouchableOpacity>

        <View style={styles.fullWidth}>
          <SettingsList />
        </View>
  
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: "center",
    paddingVertical: 30,
  },
  fullWidth: {
    width: "100%",
    paddingHorizontal: 5,
  },  
  avatarContainer: {
    position: "relative",
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 5,
    right: 5,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "limegreen",
    borderWidth: 2,
    borderColor: "#1c1c1e",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  group: {
    fontSize: 14,
    marginBottom: 20,
  },
  toggleButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 6,
    marginBottom: 30,
  },
  toggleButtonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

export default ProfileScreen;
