import React, { useState } from "react";
import { ScrollView, TouchableOpacity, Text, View, TextInput } from "react-native";
import { useTheme } from "styled-components/native";
import { Feather } from "@expo/vector-icons";

const FilterBar = () => {
  const filters = ["All", "Screenshots", "Artwork", "Workshop"];
  const [active, setActive] = useState(0);
  const theme = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 12,
        alignItems: "center",
        paddingVertical: 8,
      }}
    >
      {/* Search Field */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: theme.inputBackground,
          borderRadius: 20,
          paddingHorizontal: 10,
          height: 32,
          marginRight: 10,
          minWidth: 10,
          marginBottom: 20,
          marginTop: 12,
        }}
      >
        <Feather name="search" size={16} color={theme.placeholderColor} />
        <TextInput
          placeholder=""
          placeholderTextColor={theme.placeholderColor}
          style={{
            marginLeft: 6,
            color: theme.text,
            fontSize: 11,
            flex: 1,
            paddingVertical: 0,
          }}
        />
      </View>

      {/* Filter Buttons */}
      {filters.map((filter, index) => {
        const isActive = index === active;
        return (
          <TouchableOpacity
            key={index}
            onPress={() => setActive(index)}
            style={{
              backgroundColor: isActive ? theme.filterActive : theme.filterInactive,
              paddingVertical: 6,
              paddingHorizontal: 16,
              borderRadius: 20,
              marginRight: 8,
              height: 32,
              marginBottom: 20,
              marginTop: 12,
            }}
          >
            <Text
              style={{
                color: isActive ? "#fff" : theme.placeholderColor,
                fontWeight: "600",
                fontSize: 13,
              }}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default FilterBar;
