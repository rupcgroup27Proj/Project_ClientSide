//Formatted
import { View, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useUser } from "./Components/Contexts/UserContext"; //User context for laoding screen and getting the user
import LoginScreen from "./Screens/SharedScreens/Login/LoginScreen"; //LoginScreen
//Navs
import AdminBotNav from "./Components/Navs/AdminBotNav";
import StudentDrawer from "./Components/Navs/StudentDrawer";
import GuideDrawer from "./Components/Navs/GuideDrawer";
import TeacherDrawer from "./Components/Navs/TeacherDrawer";
import TeacherProvider from "./Components/Contexts/TeacherContext";
import FavoritesProvider from "./Components/Contexts/FavoritesContext";
import GroupChoice from "./Screens/SharedScreens/GroupChoice/GroupChoice";
import { useState } from "react";


const Main = () => {
  const { currentUser, isLoading } = useUser();


  if (isLoading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ fontSize: 24 }}>Loading</Text>
      </View>
    );


  return (
    <>
      {!currentUser
        ? (<LoginScreen />)
        : (
          <>
            {currentUser.type == "Admin" && <AdminBotNav />}
            {currentUser.type == "Student" && (
              <FavoritesProvider>
                <TeacherProvider>
                  <StudentDrawer />
                </TeacherProvider>
              </FavoritesProvider>
            )}
            {currentUser.type == "Teacher" && (
              (currentUser.groupId == -1)
                ? <GroupChoice />
                : <FavoritesProvider>
                  <TeacherProvider>
                    <TeacherDrawer />
                  </TeacherProvider>
                </FavoritesProvider>

            )}
            {currentUser.type == "Guide" && (
              (currentUser.groupId == -1)
                ? <GroupChoice/>
                : <TeacherProvider>
                  <GuideDrawer />
                </TeacherProvider>
            )}
          </>
        )}
    </>
  );
};

export default Main;
