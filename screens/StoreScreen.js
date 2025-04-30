import React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";
import GameCard from "../components/GameCard";
import GameListItem from "../components/GameListItem";
import Header from "../components/Header";
import FilterBar from "../components/FilterBar";

const StoreScreen = () => {
  return (
    <Container>
      <ScrollView>
        <Header title="Store" showSearch={true} />

        <HorizontalCardScroll>
          <CardWrapper>
            <GameCard
              title="Dead by Daylight"
              subtitle="Recommended by your friend, Player"
              discount="-70%"
              oldPrice="$18"
              newPrice="$5"
              imageUrl={require("../assets/images/Bitmap1.png")}
            />
          </CardWrapper>
          <CardWrapper>
            <GameCard
              title="Dead by Daylight"
              subtitle="Recommended by your friend, Player"
              discount="-70%"
              oldPrice="$18"
              newPrice="$5"
              imageUrl={require("../assets/images/Bitmap1.png")}
            />
          </CardWrapper>
        </HorizontalCardScroll>

        <FilterBar filters={["Top Sellers", "Free to play", "Early Access"]} />

        <GameListItem
          title="Grand Theft Auto V"
          platform="Windows"
          oldPrice="$20"
          newPrice="$10"
          discount="-50%"
          imageUrl={require("../assets/images/Bitmap (3).png")}
        />
        <GameListItem
          title="Battlefield 4"
          platform="Windows"
          price="$35"
          imageUrl={require("../assets/images/Bitmap (4).png")}
        />
        <GameListItem
          title="Factorio"
          platform="Windows, Mac"
          price="$7"
          imageUrl={require("../assets/images/Bitmap (5).png")}
        />
        <GameListItem
          title="Horizon Zero Dawn"
          platform="Windows"
          price="$38"
          imageUrl={require("../assets/images/Bitmap (6).png")}
        />
      </ScrollView>
    </Container>
  );
};

export default StoreScreen;

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  padding: 16px;
`;

const HorizontalCardScroll = styled.ScrollView.attrs(() => ({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
}))`
  margin-vertical: 2px;
`;

const CardWrapper = styled.View`
  width: 340px;
  margin-right: 10px;
`;
