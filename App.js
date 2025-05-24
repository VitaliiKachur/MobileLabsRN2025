import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ToDo from "./screens/ToDo";
import { LogLevel, OneSignal } from "react-native-onesignal";
import Constants from "expo-constants";

export default function App() {
  const EXTERNAL_ID = "vitalii-6583e";
  const APP_ID = Constants.expoConfig.extra.oneSignalAppId;

  useEffect(() => {
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    OneSignal.initialize(APP_ID);
    OneSignal.Notifications.requestPermission(true);

    OneSignal.Notifications.addEventListener(
      "foregroundWillDisplay",
      async (event) => {
        event.preventDefault();
        event.notification.display();
      }
    );

    OneSignal.Notifications.addEventListener("click", async (event) => {
      const notification = event.getNotification();
    });

    OneSignal.login(EXTERNAL_ID);
    OneSignal.User.pushSubscription.optIn();
    AsyncStorage.setItem("externalId", EXTERNAL_ID);
  }, []);

  return <ToDo />;
}

const styles = StyleSheet.create({});