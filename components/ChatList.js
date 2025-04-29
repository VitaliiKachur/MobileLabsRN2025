import React from "react";
import { FlatList } from "react-native";
import ChatItem from "./ChatItem";

const mockData = [
    {
      id: "1",
      name: "Mark Dyson",
      message: "I'm already starting to play",
      date: "14 Jun",
      avatar: require("../assets/images/Bitmap (8).png"),
      online: true,
      unread: true,
      fromUser: false,
    },
    {
      id: "2",
      name: "Mark Dyson",
      message: "Ok",
      date: "14 Jun",
      avatar: require("../assets/images/Bitmap (8).png"),
      online: true,
      unread: false,
      fromUser: true,
    },
    {
      id: "3",
      name: "Player123",
      message: "Ok",
      date: "14 Jun",
      avatar: require("../assets/images/Bitmap (9).png"),
      online: false,
      unread: false,
      fromUser: true,
    },
    {
      id: "4",
      name: "Player123",
      message: "Ok",
      date: "14 Jun",
      avatar: require("../assets/images/Bitmap (9).png"),
      online: false,
      unread: false,
      fromUser: true,
    },
    {
      id: "5",
      name: "Player",
      message: "Hello!",
      date: "12 Jun",
      avatar: require("../assets/images/Group 5.png"),
      online: false,
      unread: false,
      fromUser: false,
      noStatus: true,
    },
    {
      id: "6",
      name: "Player",
      message: "Hello!",
      date: "12 Jun",
      avatar: require("../assets/images/Group 5.png"),
      online: false,
      unread: false,
      fromUser: false,
      noStatus: true,
    },
    {
      id: "7",
      name: "💎ϟ∑χρŗêssσϟ#=_-#",
      message: "Ok",
      date: "",
      avatar: require("../assets/images/Bitmap (10).png"),
      online: true,
      unread: false,
      fromUser: false,
    },
    {
      id: "8",
      name: "💎ϟ∑χρŗêssσϟ#=_-#",
      message: "Ok",
      date: "",
      avatar: require("../assets/images/Bitmap (10).png"),
      online: true,
      unread: false,
      fromUser: false,
    },
    {
        id: "9",
        name: "💎ϟ∑χρŗêssσϟ#=_-#",
        message: "Ok",
        date: "",
        avatar: require("../assets/images/Bitmap (10).png"),
        online: true,
        unread: false,
        fromUser: false,
      },
      {
        id: "10",
        name: "Player",
        message: "Hello!",
        date: "12 Jun",
        avatar: require("../assets/images/Group 5.png"),
        online: false,
        unread: false,
        fromUser: false,
        noStatus: true,
      },
      {
        id: "11",
        name: "Mark Dyson",
        message: "I'm already starting to play",
        date: "14 Jun",
        avatar: require("../assets/images/Bitmap (8).png"),
        online: true,
        unread: true,
        fromUser: false,
      },
  ];
  

const ChatList = () => {
  return <FlatList data={mockData} keyExtractor={item => item.id} renderItem={({ item }) => <ChatItem {...item} />} />;
};

export default ChatList;



