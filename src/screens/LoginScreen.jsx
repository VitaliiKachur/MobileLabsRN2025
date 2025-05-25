import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import CustomButton from "../components/shared/CustomButton";
import CustomInput from "../components/shared/CustomInput";
import { authService } from "../services/authService";
import { useAuthentication } from "../contexts/AuthenticationContext";

const LoginScreen = ({ navigation }) => {
  const { setCurrentUser } = useAuthentication();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email.trim()) errors.email = "Email обов'язковий";
    if (!formData.password.trim()) errors.password = "Пароль обов'язковий";
    if (formData.email && !formData.email.includes('@')) errors.email = "Невірний формат email";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignIn = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    const result = await authService.signInUser(formData.email, formData.password);
    
    if (result.success) {
      setCurrentUser(result.user);
    } else {
      Alert.alert("Помилка входу", result.error);
    }
    setIsLoading(false);
  };

  return (
    <View style={globalStyles.centeredContainer}>
      <View style={globalStyles.card}>
        <Text style={globalStyles.title}>Вхід до акаунту</Text>
        <Text style={globalStyles.subtitle}>Ласкаво просимо назад!</Text>

        <CustomInput
          label="Email адреса"
          value={formData.email}
          onChangeText={(value) => handleInputChange('email', value)}
          placeholder="Введіть ваш email"
          keyboardType="email-address"
          autoCapitalize="none"
          error={formErrors.email}
        />

        <CustomInput
          label="Пароль"
          value={formData.password}
          onChangeText={(value) => handleInputChange('password', value)}
          placeholder="Введіть ваш пароль"
          secureTextEntry
          error={formErrors.password}
        />

        <CustomButton
          title="Увійти"
          onPress={handleSignIn}
          loading={isLoading}
          variant="primary"
        />

        <View style={globalStyles.divider} />

        <CustomButton
          title="Створити акаунт"
          onPress={() => navigation.navigate("Registration")}
          variant="outline"
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("PasswordReset")}
          style={{ marginTop: 20 }}
        >
          <Text style={globalStyles.linkText}>Забули пароль?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
