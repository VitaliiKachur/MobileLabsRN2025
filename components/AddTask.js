import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  Pressable,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment-timezone";
import { AddTaskFormStyles as styles } from "../styles/AddTaskFormStyles"; 

const AddTaskForm = ({ onReminderAdd }) => {
  const [reminderTitle, setReminderTitle] = useState("");
  const [reminderDetails, setReminderDetails] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [isDateTimeSelectorVisible, setDateTimeSelectorVisible] = useState(false);

  const showDateTimeSelector = () => {
    setDateTimeSelectorVisible(true);
  };

  const hideDateTimeSelector = () => {
    setDateTimeSelectorVisible(false);
  };

  const handleDateTimeConfirm = (chosenDate) => {
    const userTimeZone = moment.tz.guess();
    const localDate = moment(chosenDate).tz(userTimeZone, true).toDate();
    setSelectedDateTime(localDate);
    hideDateTimeSelector();
  };

  const submitReminder = () => {
    if (!reminderTitle || !selectedDateTime) {
      Alert.alert("Помилка", "Будь ласка, заповніть усі обов'язкові поля.");
      return;
    }

    const newReminder = {
      name: reminderTitle,
      description: reminderDetails,
      date: selectedDateTime,
      isFinished: false,
    };

    onReminderAdd(newReminder);

    setReminderTitle("");
    setReminderDetails("");
    setSelectedDateTime(null);
  };

  return (
    <View style={styles.inputFormContainer}>
      <TextInput
        style={styles.textInputStyle}
        placeholder="Назва"
        value={reminderTitle}
        onChangeText={setReminderTitle}
      />

      <TextInput
        style={styles.textInputStyle}
        placeholder="Опис"
        value={reminderDetails}
        onChangeText={setReminderDetails}
      />

      <Pressable onPress={showDateTimeSelector} style={styles.dateTimeButton}>
        <Text style={styles.dateTimeButtonText}>
          {selectedDateTime
            ? moment(selectedDateTime).format("dddd, DD MMMM YYYY р. о HH:mm") 
            : "Оберіть час"}
        </Text>
      </Pressable>

      <DateTimePickerModal
        isVisible={isDateTimeSelectorVisible}
        mode="datetime"
        onConfirm={handleDateTimeConfirm}
        onCancel={hideDateTimeSelector}
        minimumDate={new Date()}
      />

      <Button title="ДОДАТИ НАГАДУВАННЯ" onPress={submitReminder} />
    </View>
  );
};

export default AddTaskForm;