import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import StoreScreen from "../screens/StoreScreen";
import CommunityScreen from "../screens/CommunityScreen";
import ChatScreen from "../screens/ChatScreen";
import SafetyScreen from "../screens/SafetyScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { View, Image,StyleSheet, } from "react-native";

const Tab = createBottomTabNavigator();

const CustomTabBarIcon = ({ source, color, size, routeName }) => (
  <View
    style={{ alignItems: "center", justifyContent: "center", marginTop: 30 }}
  >
    <Image
      source={source}
      style={{
        width: size,
        height: size,
        tintColor: routeName === "Profile" ? null : color,
      }}
    />
  </View>
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#12141C",
            borderTopWidth: 0,
            height: 70,
            paddingBottom: 10,
            justifyContent: "center",
            alignItems: "center",
          },
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => {
            let iconSource;

            if (route.name === "Store")
              iconSource = require("../assets/images/Group.png");
            else if (route.name === "Community")
              iconSource = require("../assets/images/Group (1).png");
            else if (route.name === "Chat")
              iconSource = require("../assets/images/message-circle.png");
            else if (route.name === "Safety")
              iconSource = require("../assets/images/shield (4).png");
            else if (route.name === "Profile") {
              return (
                <View>
                  <Image
                    source={require("../assets/images/profile.png")}
                    style={styles.avatar}
                  />
                </View>
              );
            }
       

            return (
              <CustomTabBarIcon
                source={iconSource}
                color={color}
                size={18}
                routeName={route.name}
              />
            );
          },
          tabBarActiveTintColor: "#ffffff",
          tabBarInactiveTintColor: "#aaaaaa",
        })}
      >
        <Tab.Screen name="Store" component={StoreScreen} />
        <Tab.Screen name="Community" component={CommunityScreen} />
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="Safety" component={SafetyScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({

  avatar: {
    marginTop: 30,
    width: 30,
    height: 30,
    borderRadius: 50,
  },


});






export default AppNavigator;

