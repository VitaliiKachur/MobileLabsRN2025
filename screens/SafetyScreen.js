import React, { useState } from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import Header from "../components/Header";
import SegmentedControl from "../components/SegmentedControl";

const SaferyScreen = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const options = ["Guard", "Confirmations"]; 

  return (
    <ScreenWrapper>
      <Header title="Safery" showSearch={false} />
      <SegmentedControl
        options={options} 
        selectedIndex={selectedIndex} 
        onChange={setSelectedIndex} 
      />
    </ScreenWrapper>
  );
};

export default SaferyScreen;