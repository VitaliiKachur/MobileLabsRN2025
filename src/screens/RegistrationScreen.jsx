import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import CustomButton from "../components/shared/CustomButton";
import CustomInput from "../components/shared/CustomInput";
import { authService } from "../services/authService";

const RegistrationScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
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
    if (!formData.confirmPassword.trim()) errors.confirmPassword = "Підтвердження пароля обов'язкове";
    if (formData.email && !formData.email.includes('@')) errors.email = "Невірний формат email";
    if (formData.password && formData.password.length < 6) errors.password = "Пароль повинен містити мінімум 6 символів";
    if (formData.password !== formData.confirmPassword) errors.confirmPassword = "Паролі не співпадають";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegistration = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    const result = await authService.registerUser(formData.email, formData.password);
    
    if (result.success) {
      Alert.alert(
        "Успішна реєстрація", 
        "Акаунт створено успішно! Тепер ви можете увійти.",
        [{ text: "OK", onPress: () => navigation.navigate("Login") }]
      );
    } else {
      Alert.alert("Помилка реєстрації", result.error);
    }
    setIsLoading(false);
  };

  return (
    <View style={globalStyles.centeredContainer}>
      <View style={globalStyles.card}>
        <Text style={globalStyles.title}>Створення акаунту</Text>
        <Text style={globalStyles.subtitle}>Приєднайтесь до нас!</Text>

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
          placeholder="Створіть пароль"
          secureTextEntry
          error={formErrors.password}
        />

        <CustomInput
          label="Підтвердження пароля"
          value={formData.confirmPassword}
          onChangeText={(value) => handleInputChange('confirmPassword', value)}
          placeholder="Підтвердіть пароль"
          secureTextEntry
          error={formErrors.confirmPassword}
        />

        <CustomButton
          title="Створити акаунт"
          onPress={handleRegistration}
          loading={isLoading}
          variant="secondary"
        />

        <View style={globalStyles.divider} />

        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={{ marginTop: 10 }}
        >
          <Text style={globalStyles.linkText}>Вже маєте акаунт? Увійти</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegistrationScreen;