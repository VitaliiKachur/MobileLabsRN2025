import React from "react";
import { View, Text, Image } from "react-native";
import AddTaskForm from "../components/AddTask";
import RemindersList from "../components/TasksList"; 
import AppLogo from '../assets/foto.png';

import { useRemindersStorage } from "../hooks/useRemindersStorage";
import { scheduleNotification, cancelScheduledNotification } from "../services/oneSignalService";
import { ToDoStyles as styles } from "../styles/ToDoStyles"; 

const ToDo = () => {
  const { reminders, setReminders } = useRemindersStorage();

  const onReminderAdded = async (newReminderData) => {
    const notificationId = await scheduleNotification(newReminderData);

    if (notificationId) {
      newReminderData.id = notificationId;
      const updatedReminders = [newReminderData, ...reminders];
      setReminders(updatedReminders);
    } else {
      alert("Помилка надсилання сповіщення. Спробуйте ще раз.");
    }
  };

  const toggleReminderCompletion = async (reminderId) => {
    const updatedReminders = reminders.map((rem) =>
      rem.id === reminderId ? { ...rem, isFinished: !rem.isFinished } : rem
    );
    setReminders(updatedReminders);
  };

  const removeReminder = async (reminderId) => {
    const reminderToRemove = reminders.find((rem) => rem.id === reminderId);
    if (reminderToRemove && !reminderToRemove.isFinished) {
      try {
        await cancelScheduledNotification(reminderToRemove.id);
      } catch (error) {
        console.warn("Не вдалося скасувати сповіщення:", error);
      }
    }

    const updatedReminders = reminders.filter((rem) => rem.id !== reminderId);
    setReminders(updatedReminders);
  };

  return (
    <View style={styles.container}>
      <View style={styles.appHeader}>
        <Image
          source={AppLogo}
          style={styles.logoStyle}
        />
        <Text style={styles.appTitle}>To-Do Reminder</Text>
      </View>
      <AddTaskForm onReminderAdd={onReminderAdded} />
      <RemindersList
        reminders={reminders}
        onRemove={removeReminder}
        onToggleComplete={toggleReminderCompletion}
      />
    </View>
  );
};

export default ToDo;