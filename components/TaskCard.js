import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import moment from "moment";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ReminderCardStyles as styles } from "../styles/ReminderCardStyles"; 

const ReminderCard = ({ reminder, onRemove, onToggleComplete }) => {
  return (
    <View style={styles.reminderCard}>
      <View style={styles.cardBody}>
        <TouchableOpacity onPress={() => onToggleComplete(reminder.id)}>
          <Ionicons
            name={reminder.isFinished ? "radio-button-on" : "radio-button-off-outline"}
            size={24}
            color={reminder.isFinished ? "#007bff" : "#ccc"}
          />
        </TouchableOpacity>

        <View style={styles.reminderTextGroup}>
          <Text
            style={[styles.reminderTitleText, reminder.isFinished && styles.completedText]}
          >
            {reminder.name}
          </Text>
          <Text style={styles.reminderDescriptionText}>{reminder.description}</Text>
          <Text style={styles.reminderDateText}>
            {moment(reminder.date).format("dddd, DD MMMM YYYY р. о HH:mm")} 
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => onRemove(reminder.id)}
        style={styles.removeButton}
      >
        <Ionicons name="trash-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};

export default ReminderCard;