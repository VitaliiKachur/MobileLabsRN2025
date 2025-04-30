
import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { useTheme } from "../theme/ThemeContext";

const AuthCodeDisplay = ({ code = "N5KCV" }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.wrapper}>
      <ImageBackground
       source={require("../assets/images/Stroke 1.png")} 
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <Text style={[styles.label, { color: theme.secondaryText }]}>
          Logged in as player
        </Text>
        <Text style={[styles.code, { color: theme.text }]}>{code}</Text>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { backgroundColor: theme.filterActive }]} />
          <View style={[styles.progressBarRemaining, { backgroundColor: theme.filterInactive }]} />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop:20,
    width: 575,
    height: 167,
    position: "relative",
  },
  imageBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 375,
    height: 167,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    marginTop:10,
    fontSize: 14,
  },
  code: {
    fontSize: 54,
    fontWeight: "bold",
    letterSpacing: 4,
    marginTop: 8,
  },
  progressContainer: {
    flexDirection: "row",
    height: 6,
    width: 100,
    borderRadius: 3,
    overflow: "hidden",
    marginTop: 12,
  },
  progressBar: { flex: 0.6 },
  progressBarRemaining: { flex: 0.4 },
});

export default AuthCodeDisplay;
