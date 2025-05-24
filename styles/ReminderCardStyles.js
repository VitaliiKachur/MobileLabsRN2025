import { StyleSheet } from "react-native";

export const ReminderCardStyles = StyleSheet.create({
  reminderCard: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cardBody: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  reminderTextGroup: {
    marginLeft: 10,
  },
  reminderTitleText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
    color: "#333",
  },
  reminderDescriptionText: {
    fontSize: 14,
    color: "#777",
    marginBottom: 2,
  },
  reminderDateText: {
    fontSize: 12,
    color: "#888",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#aaa",
  },
  removeButton: {
    padding: 0,
  },
});