import React, { useState, useEffect } from "react";
import { View, Text, Alert, ScrollView } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import CustomButton from "../components/shared/CustomButton";
import CustomInput from "../components/shared/CustomInput";
import { userService } from "../services/userService";
import { useAuthentication } from "../contexts/AuthenticationContext";

const UserProfileScreen = ({ navigation }) => {
  const { currentUser } = useAuthentication();
  
  const [profileData, setProfileData] = useState({
    displayName: "",
    age: "",
    city: "",
    educationalInstitution: "",
    hobbies: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    if (!currentUser) {
      console.log('No current user found');
      return;
    }

    console.log('Current user:', currentUser.uid, currentUser.email);
    setIsLoading(true);
    
    const result = await userService.getUserProfile(currentUser.uid);
    
    if (result.success) {
      console.log('Profile loaded successfully:', result.data);
      setProfileData(prev => ({ ...prev, ...result.data }));
    } else {
      console.log('Failed to load profile:', result.error);
      if (!result.error.includes("not found")) {
        Alert.alert("Помилка завантаження", result.error);
      }
    }
    setIsLoading(false);
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const validateProfile = () => {
    if (profileData.age && isNaN(profileData.age)) {
      Alert.alert("Помилка", "Вік повинен бути числом");
      return false;
    }
    return true;
  };

  const handleSaveProfile = async () => {
    if (!currentUser) {
      Alert.alert("Помилка", "Користувач не автентифікований");
      return;
    }

    if (!validateProfile()) {
      return;
    }

    console.log('Saving profile for user:', currentUser.uid);
    console.log('Profile data to save:', profileData);

    setIsSaving(true);
    
    const result = await userService.updateUserProfile(currentUser.uid, profileData);
    
    if (result.success) {
      Alert.alert("Успіх", "Профіль оновлено успішно!");
    } else {
      console.error('Save failed:', result.error);
      Alert.alert("Помилка збереження", result.error);
    }
    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <View style={globalStyles.centeredContainer}>
        <Text style={globalStyles.loadingText}>Завантаження профілю...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>Мій Профіль</Text>
      
      <View style={globalStyles.card}>
        <Text style={[globalStyles.subtitle, { textAlign: 'left', marginBottom: 20 }]}>
          Email: {currentUser?.email}
        </Text>
        <Text style={[globalStyles.subtitle, { textAlign: 'left', marginBottom: 20, fontSize: 12 }]}>
          User ID: {currentUser?.uid}
        </Text>

        <CustomInput
          label="Ім'я та прізвище"
          value={profileData.displayName}
          onChangeText={(value) => handleInputChange('displayName', value)}
          placeholder="Введіть ваше повне ім'я"
        />

        <CustomInput
          label="Вік"
          value={profileData.age}
          onChangeText={(value) => handleInputChange('age', value)}
          placeholder="Введіть ваш вік"
          keyboardType="numeric"
        />

        <CustomInput
          label="Місто проживання"
          value={profileData.city}
          onChangeText={(value) => handleInputChange('city', value)}
          placeholder="Введіть ваше місто"
        />

        <CustomInput
          label="Навчальний заклад"
          value={profileData.educationalInstitution}
          onChangeText={(value) => handleInputChange('educationalInstitution', value)}
          placeholder="Назва університету/школи"
        />

        <CustomInput
          label="Хобі та інтереси"
          value={profileData.hobbies}
          onChangeText={(value) => handleInputChange('hobbies', value)}
          placeholder="Розкажіть про ваші захоплення"
          multiline
          numberOfLines={3}
        />

        <CustomButton
          title="Зберегти зміни"
          onPress={handleSaveProfile}
          loading={isSaving}
          variant="secondary"
        />

        <View style={globalStyles.divider} />

        <CustomButton
          title="Налаштування акаунту"
          onPress={() => navigation.navigate("AccountManagement")}
          variant="gray"
        />
      </View>
    </ScrollView>
  );
};

export default UserProfileScreen;