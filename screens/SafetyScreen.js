import React, { useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import ScreenWrapper from "../components/ScreenWrapper";
import Header from "../components/Header";
import SegmentedControl from "../components/SegmentedControl";
import AuthCodeDisplay from "../components/AuthCodeDisplay";
import InfoText from "../components/InfoText";
import SettingsList from "../components/SettingsList";

const SaferyScreen = () => {
  const { theme } = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const options = ["Guard", "Confirmations"];

  return (
    <ScreenWrapper style={{ backgroundColor: theme.background }}>
      <Header title="Safety" showSearch={false} />
      <SegmentedControl
        options={options}
        selectedIndex={selectedIndex}
        onChange={setSelectedIndex}
      />
      <ScrollView>
        <AuthCodeDisplay />
        <InfoText />
        <SettingsList />
      </ScrollView>
    </ScreenWrapper>
  );
};

export default SaferyScreen;
