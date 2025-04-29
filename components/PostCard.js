import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useTheme } from "styled-components/native";
import { Feather } from "@expo/vector-icons";

const PostCard = ({
  author,
  time,
  title,
  description,
  image,
  avatar,
  likes,
  comments,
  isNews,
}) => {
  const theme = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      <View style={styles.headerRow}>
        <View style={styles.header}>
          <Image source={avatar} style={styles.avatar} />
          <View style={{ marginLeft: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[styles.author, { color: theme.text }]}>{author}</Text>
              {isNews && (
                <View style={styles.newsBadge}>
                  <Text style={styles.newsText}>NEWS</Text>
                </View>
              )}
            </View>
            <Text style={[styles.time, { color: theme.textSecondary }]}>{time}</Text>
          </View>
        </View>
        <Feather name="more-horizontal" size={20} color={theme.textSecondary} />
      </View>

      <Image source={image} style={styles.image} />

      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      <Text style={[styles.description, { color: theme.textSecondary }]}>{description}</Text>
      <View
  style={{
    height: 1,
    backgroundColor: theme.border || "#3a3a3c",
    marginVertical: 10,
  }}
/>
      <View style={styles.footer}>
        <Feather name="thumbs-up" size={16} color="green" />
        <Text style={styles.footerText1}>{likes}</Text>
        <Feather name="message-circle" size={16} color="gray" style={{ marginLeft: 16 }} />
        <Text style={styles.footerText}>{comments}</Text>
        <Feather name="share" size={16} color="gray" style={{ marginLeft: 16, marginLeft: "auto" }} />
      </View>
      
    </View>
    
    
  );
};

const styles = StyleSheet.create({
  card: {
   
    padding: 12,
 
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  author: {
    fontWeight: "bold",
    fontSize: 14,
  },
  newsBadge: {
    backgroundColor: "#c678dd",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 6,
  },
  newsText: {
    fontSize: 10,
    color: "#fff",
    fontWeight: "bold",
  },
  time: {
    fontSize: 12,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerText1: {
    color: '#1aa34a',
    marginLeft: 6,
    fontSize: 13,
  },
  footerText: {
    color: '#3a3a3c',
    marginLeft: 6,
    fontSize: 13,
  },
});

export default PostCard;
