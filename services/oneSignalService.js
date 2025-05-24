import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment-timezone";

const APP_ID = Constants.expoConfig.extra.oneSignalAppId;
const API_KEY = Constants.expoConfig.extra.oneSignalApiKey;

const getAppUserId = async () => {
  return await AsyncStorage.getItem("externalId");
};

export const scheduleNotification = async (reminderData) => {
  try {
    const externalUserId = await getAppUserId();
    const localDateTime = moment(reminderData.date).tz("Europe/Kiev", true).toDate();

    const response = await fetch("https://api.onesignal.com/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${API_KEY}`,
      },
      body: JSON.stringify({
        app_id: APP_ID,
        target_channel: "push",
        include_aliases: {
          external_id: [externalUserId],
        },
        headings: { en: reminderData.name },
        contents: { en: reminderData.description },
        send_after: localDateTime.toISOString(),
      }),
    });

    const responseData = await response.json();
    if (responseData.errors) {
      console.error("OneSignal API Error (scheduleNotification):", responseData.errors);
      return false;
    }
    return responseData.id;
  } catch (error) {
    console.error("Error scheduling notification:", error);
    return false;
  }
};

export const cancelScheduledNotification = async (notificationIdentifier) => {
  try {
    const response = await fetch(
      `https://api.onesignal.com/notifications/${notificationIdentifier}?app_id=${APP_ID}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${API_KEY}`,
        },
      }
    );
    const responseData = await response.json();
    if (responseData.errors) {
      console.error("OneSignal API Error (cancelScheduledNotification):", responseData.errors);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error canceling notification:", error);
    return false;
  }
};