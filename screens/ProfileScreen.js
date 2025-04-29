import React from 'react';
import { View, Text, Button } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

const ProfileScreen = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.background, padding: 20 }}>
      <Text style={{ color: theme.text, fontSize: 24 }}>Profile</Text>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
};

export default ProfileScreen;
