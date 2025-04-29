// components/ChatItem.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "styled-components/native";
import Avatar from "./Avatar";

const ChatItem = ({ name, message, date, avatar, online, unread, selected, fromUser, noStatus }) => {
  const theme = useTheme();

  const containerStyle = {
    backgroundColor: selected ? theme.background : theme.card,
    borderBottomColor: theme.inputBackground,
    borderWidth: selected ? 1 : 0,
    borderColor: selected ? theme.primary : "transparent",
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Avatar source={avatar} online={online} noStatus={noStatus} />
      <View style={styles.textContainer}>
        <Text style={[styles.name, { color: selected ? theme.text : theme.secondaryText }]}>{name}</Text>
        <Text style={styles.messageLine}>
          {fromUser && (
            <Text style={[styles.youPrefix, { color: theme.secondaryText }]}>You: </Text>
          )}
          <Text style={[styles.message, { color: selected ? theme.textSecondary : theme.secondaryText }]}>
            {message}
          </Text>
        </Text>
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.metaContainer}>
          <Text style={[styles.date, { color: theme.secondaryText }]}>{date}</Text>
          {!unread && <Text style={{ marginHorizontal: 4, color: theme.secondaryText }}>•</Text>}
        </View>
        {unread && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>1</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  messageLine: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  youPrefix: {
    fontWeight: "bold",
  },
  message: {
    fontSize: 14,
  },
  rightContainer: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 40,
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    fontSize: 12,
  },
  unreadBadge: {
    marginTop: 4,
    backgroundColor: "#1A8FFF",
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  unreadText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default ChatItem;
