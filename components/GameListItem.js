import React from "react";
import styled from "styled-components/native";

const GameListItem = ({
  title,
  platform,
  oldPrice,
  newPrice,
  discount,
  imageUrl,
}) => (
  <Item>
    <GameImage source={imageUrl} />
    <Details>
      <Title>{title}</Title>
      <PlatformRow>
        <PlatformIcon
          source={require("../assets/images/microsoft-windows-22.png")}
        />
        <Platform>{platform}</Platform>
      </PlatformRow>
    </Details>
    <PriceBlock>
      <PriceRow>
        {oldPrice && <OldPrice>{oldPrice}</OldPrice>}
        <Price>{newPrice}</Price>
      </PriceRow>
      {discount && <Discount>{discount}</Discount>}
    </PriceBlock>
  </Item>
);

export default GameListItem;

const Item = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const GameImage = styled.Image`
  width: 72px;
  height: 50px;
  border-radius: 6px;
  background-color: #ccc;
`;

const Details = styled.View`
  flex: 1;
  margin-left: 12px;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text};
`;

const PlatformRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const PlatformIcon = styled.Image`
  width: 14px;
  height: 14px;
`;

const Platform = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.textSecondary};
`;

const PriceBlock = styled.View`
  align-items: flex-end;
`;
const PriceRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

const Discount = styled.Text`
  background-color: #1aa34a;
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 2px;
`;

const OldPrice = styled.Text`
  font-size: 12px;
  color: #888;
  text-decoration: line-through;
`;

const Price = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: ${({ theme }) => theme.text};
`;
