import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  const FIREBASE_API_KEY = "AIzaSyCGNIDldI_Yl8FCi_X39l-rVHOTJ9TMg3A";

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      );

      const token = response.data.idToken;
      const localId = response.data.localId;

      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("userId", localId);

      setUserToken(token);
      setUserId(localId);
      
      return { success: true };
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      const errorMessage = error.response?.data?.error?.message || "Login failed";
      Alert.alert("Login Error", errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email, password, name) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      );

      const { idToken, localId } = response.data;

      await AsyncStorage.setItem("userToken", idToken);
      await AsyncStorage.setItem("userId", localId);

      // Save user profile to database
      await api.put(`/users/${localId}.json`, {
        name,
        email,
        createdAt: new Date().toISOString(),
      });

      setUserToken(idToken);
      setUserId(localId);
      
      return { success: true };
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      const errorMessage = error.response?.data?.error?.message || "Registration failed";
      Alert.alert("Registration Error", errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const storedUserId = await AsyncStorage.getItem("userId");
      
      if (token && storedUserId) {
        setUserToken(token);
        setUserId(storedUserId);
      }
    } catch (error) {
      console.log("Token check error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userId");
      setUserToken(null);
      setUserId(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{ 
        userToken, 
        userId, 
        isLoading, 
        login, 
        logout, 
        register,
        isAuthenticated: !!userToken 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};