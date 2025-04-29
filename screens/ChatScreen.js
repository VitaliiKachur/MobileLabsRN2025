import React from "react";
import { useState } from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import Header from "../components/Header";
import ChatList from "../components/ChatList";
import SegmentedControl from "../components/SegmentedControl";

const ChatScreen = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <ScreenWrapper>
    <Header title="Chat" showSearch={true} />
    <SegmentedControl
      selected={selectedIndex}
      onChange={setSelectedIndex}
    />
    <ChatList />
  </ScreenWrapper>
  );
};

export default ChatScreen;
