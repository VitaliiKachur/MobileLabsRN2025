import React from 'react';
import { Text } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import { useTheme } from 'styled-components/native';

const StoreScreen = () => {
  const theme = useTheme();

  return (
    <ScreenWrapper>
      <Text style={{ color: theme.text, fontSize: 24 }}>Safety</Text>
    </ScreenWrapper>
  );
};

export default StoreScreen;
