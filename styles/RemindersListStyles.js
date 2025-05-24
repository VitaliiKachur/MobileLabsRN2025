import { StyleSheet } from "react-native";

export const RemindersListStyles = StyleSheet.create({
  listContainer: {
    flex: 1,
    padding: 0,
    backgroundColor: "#f0f0f0",
    borderRadius: 0,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  noRemindersMessage: {
    fontSize: 18,
    textAlign: "center",
    color: "#888",
  },
});