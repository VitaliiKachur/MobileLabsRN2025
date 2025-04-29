import React from "react";
import { useState } from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import Header from "../components/Header";
import ChatList from "../components/ChatList";
import SegmentedControl from "../components/SegmentedControl";

const ChatScreen = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const options = ["Open chats", "My friends"];
  return (
    <ScreenWrapper>
    <Header title="Chat" showSearch={true} />
    <SegmentedControl
      options={options}
      selected={selectedIndex}
      onChange={setSelectedIndex}
    />
    <ChatList />
  </ScreenWrapper>
  );
};

export default ChatScreen;
