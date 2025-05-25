import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { globalStyles, colors } from '../../styles/globalStyles';

const CustomButton = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  disabled = false, 
  loading = false,
  style,
  textStyle 
}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'secondary': return globalStyles.secondaryButton;
      case 'danger': return globalStyles.dangerButton;
      case 'warning': return globalStyles.warningButton;
      case 'gray': return globalStyles.grayButton;
      case 'outline': return globalStyles.outlineButton;
      default: return globalStyles.primaryButton;
    }
  };

  const getTextStyle = () => {
    return variant === 'outline' ? globalStyles.outlineButtonText : globalStyles.buttonText;
  };

  return (
    <TouchableOpacity
      style={[
        globalStyles.button,
        getButtonStyle(),
        disabled && { opacity: 0.6 },
        style
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? colors.primary : colors.white} />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;