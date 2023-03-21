//import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
//import { SafeAreaProvider } from "react-native-safe-area-context";
//import { createDrawerNavigator } from "@react-navigation/drawer";
//import AsyncStorage from "@react-native-async-storage/async-storage";
//import { useEffect, useState } from "react";
import NewPost from "./Screens/StudentScreens/SocialCloud/NewPost";
import SocialFeed from "./Screens/StudentScreens/SocialCloud/SocialFeed";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const Stack = createNativeStackNavigator();
//hi
export default function App() {
  return (
    // <SafeAreaProvider>
    // <NewPost></NewPost>
    // </SafeAreaProvider>

    <NavigationContainer>
      <Stack.Navigator initialRouteName="NewPost">
        <Stack.Screen name="SocialFeed" component={SocialFeed} />
        <Stack.Screen name="NewPost" component={NewPost}/>
      </Stack.Navigator>
    </NavigationContainer>
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
