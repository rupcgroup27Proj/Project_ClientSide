import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Context
import UserProvider from "./Components/Contexts/UserContext";
import NewPost from "./Screens/StudentScreens/SocialCloud/NewPost";
import SocialFeed from "./Screens/StudentScreens/SocialCloud/SocialFeed";
import Favorites from "./Screens/StudentScreens/SocialCloud/Favorites";
import Comments from "./Screens/StudentScreens/SocialCloud/Comments";

const Stack = createNativeStackNavigator();

export default function App() {
  const Tab = createMaterialBottomTabNavigator();
  const Drawer = createDrawerNavigator();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SocialFeed">
          <Stack.Screen name="SocialFeed" component={SocialFeed} />
          <Stack.Screen name="NewPost" component={NewPost} />
          <Stack.Screen name="Comments" component={Comments} />
          <Stack.Screen name="Favorites" component={Favorites} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
