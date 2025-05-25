import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import CustomButton from "../components/shared/CustomButton";
import CustomInput from "../components/shared/CustomInput";
import { authService } from "../services/authService";

const PasswordResetScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const validateEmail = () => {
    if (!email.trim()) {
      setEmailError("Email обов'язковий");
      return false;
    }
    if (!email.includes('@')) {
      setEmailError("Невірний формат email");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handlePasswordReset = async () => {
    if (!validateEmail()) return;

    setIsLoading(true);
    const result = await authService.resetUserPassword(email);
    
    if (result.success) {
      Alert.alert(
        "Успішно!",
        "Лист для скидання пароля надіслано на ваш email",
        [{ text: "OK", onPress: () => navigation.navigate("Login") }]
      );
    } else {
      Alert.alert("Помилка", result.error);
    }
    setIsLoading(false);
  };

  return (
    <View style={globalStyles.centeredContainer}>
      <View style={globalStyles.card}>
        <Text style={globalStyles.title}>Скидання пароля</Text>
        <Text style={globalStyles.subtitle}>
          Введіть ваш email для отримання посилання на скидання пароля
        </Text>

        <CustomInput
          label="Email адреса"
          value={email}
          onChangeText={(value) => {
            setEmail(value);
            if (emailError) setEmailError("");
          }}
          placeholder="Введіть ваш email"
          keyboardType="email-address"
          autoCapitalize="none"
          error={emailError}
        />

        <CustomButton
          title="Надіслати посилання"
          onPress={handlePasswordReset}
          loading={isLoading}
          variant="warning"
        />

        <View style={globalStyles.divider} />

        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={{ marginTop: 10 }}
        >
          <Text style={globalStyles.linkText}>Повернутися до входу</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PasswordResetScreen;