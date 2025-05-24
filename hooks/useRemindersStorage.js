import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useRemindersStorage = () => {
  const [reminders, setReminders] = useState([]);

  const loadReminders = async () => {
    try {
      const storedReminders = await AsyncStorage.getItem("reminders");
      if (storedReminders) {
        const parsedReminders = JSON.parse(storedReminders);
        parsedReminders.sort((a, b) => new Date(b.date) - new Date(a.date));
        setReminders(parsedReminders);
      }
    } catch (error) {
      console.error("Error loading reminders from storage:", error);
    }
  };

  const saveReminders = async (currentReminders) => {
    try {
      currentReminders.sort((a, b) => new Date(b.date) - new Date(a.date));
      await AsyncStorage.setItem("reminders", JSON.stringify(currentReminders));
    } catch (error) {
      console.error("Error saving reminders to storage:", error);
    }
  };

  useEffect(() => {
    loadReminders();
  }, []);

  useEffect(() => {
    if (reminders.length > 0) { 
        saveReminders(reminders);
    }
  }, [reminders]);


  return { reminders, setReminders, loadReminders };
};