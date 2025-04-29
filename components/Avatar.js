import React from "react";
import { View, Image, StyleSheet } from "react-native";

const Avatar = ({ source, online, noStatus }) => {
  return (
    <View style={styles.container}>
      <Image source={source} style={styles.avatar} />
      {noStatus ? null : (
        <View
          style={[
            styles.statusDot,
            {
              backgroundColor:
                online === undefined
                  ? "transparent"
                  : online
                  ? "#00FF00" 
                  : "#1A8FFF", 
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  statusDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#1E2029", 
  },
});

export default Avatar;
