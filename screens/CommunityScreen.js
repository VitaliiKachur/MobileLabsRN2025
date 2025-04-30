import React from "react";
import { ScrollView, Text, View } from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import Header from "../components/Header";
import PostCard from "../components/PostCard";
import FilterBar from "../components/FilterBar";

const CommunityScreen = () => {
  return (
    <ScreenWrapper>
     <Header title="Community" showSearch={false} />
      <View style={{ paddingHorizontal: 12 }}>
        <Text style={{ color: "#A0A0A0", fontSize: 16,marginBottom: 30 }}>
          Community and official content for all games and software
        </Text>
      </View>
      <FilterBar filters={["All", "Screenshots", "Artwork", "Workshop"]} searchEnabled />
      <ScrollView showsVerticalScrollIndicator={false}>
        <PostCard
          author="Eurogamer"
          isNews={true}
          time="yesterday • 2:20 pm"
          title="Florida tourist attraction sues Fortnite, seeks removal of in-game castle"
          description="Coral Castle Museum, a tourist attraction near Miami, is suing Fortnite maker Epic Games for trademark infringement and unfair competition."
          image={require("../assets/images/kingdom_come.png")}
          avatar={require("../assets/images/eurogamer.png")}
          likes={324}
          comments={12}
        />
         <PostCard
          author="Eurogamer"
          isNews={true}
          time="yesterday • 2:20 pm"
          title="Florida tourist attraction sues Fortnite, seeks removal of in-game castle"
          description="Coral Castle Museum, a tourist attraction near Miami, is suing Fortnite maker Epic Games for trademark infringement and unfair competition."
          image={require("../assets/images/kingdom_come.png")}
          avatar={require("../assets/images/eurogamer.png")}
          likes={324}
          comments={12}
        />
        
      </ScrollView>
    </ScreenWrapper>
  );
};

export default CommunityScreen;
