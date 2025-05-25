import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';

const CustomInput = ({ 
  label, 
  value, 
  onChangeText, 
  placeholder, 
  secureTextEntry = false,
  keyboardType = 'default',
  error,
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={globalStyles.inputContainer}>
      {label && <Text style={globalStyles.label}>{label}</Text>}
      <TextInput
        style={[
          globalStyles.input,
          isFocused && globalStyles.inputFocused,
          error && { borderColor: 'red' }
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      {error && <Text style={globalStyles.errorText}>{error}</Text>}
    </View>
  );
};

export default CustomInput;
