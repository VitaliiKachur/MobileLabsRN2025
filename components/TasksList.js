import React from "react";
import { View, Text, FlatList } from "react-native";
import ReminderCard from "./TaskCard"; 
import { RemindersListStyles as styles } from "../styles/RemindersListStyles"; 

const RemindersList = ({ reminders, onRemove, onToggleComplete }) => {
  const renderReminderItem = ({ item: reminderItem }) => (
    <ReminderCard
      reminder={reminderItem}
      onRemove={onRemove}
      onToggleComplete={onToggleComplete}
    />
  );

  if (!reminders.length) {
    return (
      <View style={styles.emptyListContainer}>
        <Text style={styles.noRemindersMessage}>Немає завдань!</Text>
      </View>
    );
  }

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderReminderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default RemindersList;