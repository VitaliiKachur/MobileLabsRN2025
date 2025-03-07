import React from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import logoImage from "./assets/foto1.png";
import logoImage2 from "./assets/logo1.png";
import logoImage3 from "./assets/logo2.png";
import logoImage4 from "./assets/logo3.jpg";
import newsImage from "./assets/foto1.png";


const Stack = createStackNavigator();

const newsData = Array(8).fill({
  title: "Заголовок новини",
  date: "Дата новини",
  text: "Короткий текст новини",
  image: newsImage,
});

const galleryImages = [
  require("./assets/1.jpg"),
  require("./assets/2.jpg"),
  require("./assets/3.jpg"),
  require("./assets/4.jpg"),
  require("./assets/5.jpg"),
  require("./assets/6.jpg"),
  require("./assets/7.jpg"),
  require("./assets/8.jpg"),
  require("./assets/9.jpg"),
  require("./assets/10.jpg"),
];

const galleryData = galleryImages.map((image) => ({ image }));

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header />
      <NavBar navigation={navigation} currentScreen="Home" />
      <Text style={styles.newsTitle}>Новини</Text>
      <FlatList
        data={newsData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.newsItem}>
            <Image source={item.image} style={styles.newsImage} resizeMode="contain" />
            <View style={styles.newsContent}>
              <Text style={styles.newsHeader}>{item.title}</Text>
              <Text style={styles.newsDate}>{item.date}</Text>
              <Text style={styles.newsText}>{item.text}</Text>
            </View>
          </View>
        )}
      />
      <Footer />
    </View>
  );
}

function GalleryScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header />
      <NavBar navigation={navigation} currentScreen="Gallery" />
      <FlatList
        data={galleryData}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2} 
        renderItem={({ item }) => (
          <Image source={item.image} style={styles.galleryImage} resizeMode="cover" />
        )}
      />
      <Footer />
    </View>
  );
}


function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header />
      <NavBar navigation={navigation} currentScreen="Profile" />
      <Text style={styles.newsTitle}>Реєстрація</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Електронна пошта</Text>
        <TextInput style={styles.input} />

        <Text style={styles.label}>Пароль</Text>
        <TextInput style={styles.input} secureTextEntry />

        <Text style={styles.label}>Пароль (ще раз)</Text>
        <TextInput style={styles.input} secureTextEntry />

        <Text style={styles.label}>Прізвище</Text>
        <TextInput style={styles.input} />

        <Text style={styles.label}>Ім’я</Text>
        <TextInput style={styles.input} />

        <TouchableOpacity style={{ ...styles.input, backgroundColor: "#007bff", alignItems: "center" }}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Зареєструватися</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
}

function Header() {
  return (
    <View style={styles.header}>
      <Image source={logoImage} style={styles.logo} resizeMode="contain" />
      <Text style={styles.appTitle}>FirstMobileApp</Text>
    </View>
  );
}

function NavBar({ navigation, currentScreen }) {
  return (
    <View style={styles.navBar}>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("Home")}>
        <View style={styles.navItem}>
          <Image source={logoImage2} style={styles.navIcon} resizeMode="contain" />
          <Text style={currentScreen === "Home" ? styles.activeTab : styles.inactiveTab}>Головна</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("Gallery")}>
        <View style={styles.navItem}>
          <Image source={logoImage3} style={styles.navIcon} resizeMode="contain" />
          <Text style={currentScreen === "Gallery" ? styles.activeTab : styles.inactiveTab}>Фотогалерея</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("Profile")}>
        <View style={styles.navItem}>
          <Image source={logoImage4} style={styles.navIcon} resizeMode="contain" />
          <Text style={currentScreen === "Profile" ? styles.activeTab : styles.inactiveTab}>Профіль</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

function Footer() {
  return (
    <View style={styles.footerContainer}>
      <Text style={styles.footer}>Качур Віталій Васильович, ВТк-24-1</Text>
    </View>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Gallery" component={GalleryScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 40 },
  header: { flexDirection: "row", alignItems: "center", padding: 10 },
  logo: { width: 120, height: 40, marginRight: 10 },
  appTitle: { fontSize: 20, fontWeight: "bold", marginLeft: 50 },
  navBar: {flexDirection: "row", justifyContent: "space-around", paddingBottom: 5, },
  navButton: { padding: 8 },
  navItem: { alignItems: "center" },
  navIcon: { width: 100, height: 30, marginBottom: 5 },
  activeTab: { fontWeight: "bold", color: "blue", textAlign: "center" },
  inactiveTab: { color: "gray" },
  newsTitle: { fontSize: 22, fontWeight: "bold", padding: 10, textAlign: "center" },
  newsItem: {flexDirection: "row", padding: 10, borderBottomWidth: 1, borderColor: "#ccc", alignItems: "center", },
  newsImage: { width: 60, height: 60, marginRight: 10 },
  newsContent: { flex: 1 },
  newsHeader: { fontSize: 16, fontWeight: "bold" },
  newsDate: { color: "gray" },
  newsText: { color: "black" },
  galleryImage: {width: 178, height: 120, margin: "2.5%", borderRadius: 10, },
  form: { padding: 20 },
  input: {borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, marginBottom: 10, },
  footerContainer: {position: "absolute", bottom: 0, width: "100%", backgroundColor: "#fff", padding: 10, color: "gray", alignItems: "center",  },
});

