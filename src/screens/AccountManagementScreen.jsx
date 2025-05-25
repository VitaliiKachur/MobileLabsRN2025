import React, { useState } from "react";
import { View, Text, Alert, ScrollView } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import CustomButton from "../components/shared/CustomButton";
import CustomInput from "../components/shared/CustomInput";
import { authService } from "../services/authService";
import { useAuthentication } from "../contexts/AuthenticationContext";

const AccountManagementScreen = ({ navigation }) => {
  const { currentUser, setCurrentUser } = useAuthentication();
  
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showCredentialsForm, setShowCredentialsForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (field, value) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateCredentials = () => {
    const errors = {};
    if (!credentials.email.trim()) errors.email = "Email обов'язковий";
    if (!credentials.password.trim()) errors.password = "Пароль обов'язковий";
    if (credentials.email && !credentials.email.includes('@')) errors.email = "Невірний формат email";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignOut = async () => {
    Alert.alert(
      "Підтвердження виходу",
      "Ви впевнені, що хочете вийти з акаунту?",
      [
        { text: "Скасувати", style: "cancel" },
        {
          text: "Вийти",
          style: "destructive",
          onPress: async () => {
            setIsLoading(true);
            const result = await authService.signOutUser();
            if (result.success) {
              setCurrentUser(null);
            } else {
              Alert.alert("Помилка", result.error);
            }
            setIsLoading(false);
          }
        }
      ]
    );
  };

  const handleInitiateAccountDeletion = () => {
    setShowCredentialsForm(true);
  };

  const handleConfirmAccountDeletion = () => {
    if (!validateCredentials()) return;
    setShowDeleteConfirmation(true);
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    const result = await authService.deleteUserAccount(credentials.email, credentials.password);
    
    if (result.success) {
      Alert.alert(
        "Акаунт видалено",
        "Ваш акаунт було успішно видалено",
        [{ text: "OK", onPress: () => setCurrentUser(null) }]
      );
    } else {
      Alert.alert("Помилка видалення", result.error);
    }
    setIsLoading(false);
    setShowDeleteConfirmation(false);
    setShowCredentialsForm(false);
  };

  const handleCancelDeletion = () => {
    setShowDeleteConfirmation(false);
    setShowCredentialsForm(false);
    setCredentials({ email: "", password: "" });
    setFormErrors({});
  };

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>Налаштування акаунту</Text>
      
      <View style={globalStyles.card}>
        <Text style={[globalStyles.subtitle, { textAlign: 'left', marginBottom: 20 }]}>
          Поточний акаунт: {currentUser?.email}
        </Text>

        <CustomButton
          title="Повернутися до профілю"
          onPress={() => navigation.goBack()}
          variant="outline"
        />

        <View style={globalStyles.divider} />

        <CustomButton
          title="Вийти з акаунту"
          onPress={handleSignOut}
          loading={isLoading}
          variant="primary"
        />

        <View style={globalStyles.divider} />

        {!showCredentialsForm && (
          <CustomButton
            title="Видалити акаунт"
            onPress={handleInitiateAccountDeletion}
            variant="danger"
          />
        )}

        {showCredentialsForm && !showDeleteConfirmation && (
          <View>
            <Text style={[globalStyles.subtitle, { color: '#ef4444', textAlign: 'left' }]}>
              Для видалення акаунту підтвердіть ваші облікові дані:
            </Text>

            <CustomInput
              label="Email"
              value={credentials.email}
              onChangeText={(value) => handleInputChange('email', value)}
              placeholder="Введіть ваш email"
              keyboardType="email-address"
              autoCapitalize="none"
              error={formErrors.email}
            />

            <CustomInput
              label="Пароль"
              value={credentials.password}
              onChangeText={(value) => handleInputChange('password', value)}
              placeholder="Введіть ваш пароль"
              secureTextEntry
              error={formErrors.password}
            />

            <CustomButton
              title="Підтвердити облікові дані"
              onPress={handleConfirmAccountDeletion}
              variant="warning"
            />

            <CustomButton
              title="Скасувати"
              onPress={handleCancelDeletion}
              variant="gray"
            />
          </View>
        )}

        {showDeleteConfirmation && (
          <View>
            <Text style={[globalStyles.subtitle, { color: '#ef4444', textAlign: 'center' }]}>
              ⚠️ УВАГА! ⚠️
            </Text>
            <Text style={[globalStyles.subtitle, { textAlign: 'center', marginBottom: 30 }]}>
              Це дія незворотна! Всі ваші дані будуть назавжди видалені.
              Ви впевнені, що хочете видалити акаунт?
            </Text>

            <CustomButton
              title="ТАК, ВИДАЛИТИ АКАУНТ"
              onPress={handleDeleteAccount}
              loading={isLoading}
              variant="danger"
            />

            <CustomButton
              title="НІ, ЗАЛИШИТИ АКАУНТ"
              onPress={handleCancelDeletion}
              variant="secondary"
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default AccountManagementScreen;