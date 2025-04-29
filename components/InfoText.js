import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeContext";

const InfoText = () => {
  const { theme } = useTheme();

  return (
    <View style={{ paddingHorizontal: 16 }}>
      <Text style={[styles.text, { color: theme.textSecondary }]}>
        You’ll enter your code each time you enter your password to sign in to your Steam account.
      </Text>
      <Text style={[styles.tip, { color: "#1A8FFF", marginTop: 10, marginBottom:15,}]}>
        Tip: If you don’t share your PC, you can select “Remember my password” when you sign in to the PC client to enter your password and authenticator code less often.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: { fontSize: 14, lineHeight: 20, marginTop: 15, },
  tip: { fontSize: 14, lineHeight: 20, },
});

export default InfoText;
