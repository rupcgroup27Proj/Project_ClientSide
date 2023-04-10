import "react-native-gesture-handler"; //By React Navigation docs, this import must always be imported first!
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useTeacher } from "../Contexts/TeacherContext";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from "react-native-paper";
//Student screens
import Home from "../../Screens/StudentScreens/Home/Home";
import SocialCloud from "../SubNavs/SocialFeedNav";
import Recommandations from "../../Screens/StudentScreens/Recommendations/Recommendations";
import MyMap from "../../Screens/StudentScreens/MyMap/MyMap";
import DailySchedule from "../../Screens/SharedScreens/DailySchedule/DailySchedule";
import Notifications from "../../Screens/StudentScreens/Notifications/Notifications";
import Tasks from "../../Screens/StudentScreens/Tasks/Tasks";
import PersonalDiary from "../../Screens/StudentScreens/PersonalDiary/PersonalDiary";
import Profile from "../../Screens/SharedScreens/Profile/Profile";
import GuideFeedback from "../../Screens/SharedScreens/GuideFeedback/GuideFeedback";
import Questionnaires from "../SubNavs/QuestionnairesNav";
import Logout from "../../Screens/SharedScreens/Logout/Logout";
import Favorites from "../../Screens/StudentScreens/Favorites/Favorites";




const StudentDrawer = () => {

  const { journeyStarted, remainingDays } = useTeacher();
  const Drawer = createDrawerNavigator();
  const theme = useTheme();


  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} options={{ drawerIcon: () => (<Icon name="home" size={20} color={theme.colors.primary} />), drawerLabelStyle: { marginLeft: -25 } }} />
      {journeyStarted && (
        <>
          <Drawer.Screen name="Profile" component={Profile} options={{ drawerIcon: () => (<Icon name="account-circle" size={20} color={theme.colors.primary} />), drawerLabelStyle: { marginLeft: -25 } }} />
          {remainingDays <= 0 ? (
            <>
              <Drawer.Screen name="Social Cloud" component={SocialCloud} options={{ drawerIcon: () => (<Icon name="cloud" size={20} color={theme.colors.primary} />), drawerLabelStyle: { marginLeft: -25 } }} />
              <Drawer.Screen name="Favorites" component={Favorites} options={{ drawerIcon: () => (<Icon name="bookmark-multiple" size={20} color={theme.colors.primary} />), drawerLabelStyle: { marginLeft: -25 } }} />
              <Drawer.Screen name="Questionnaires" component={Questionnaires} options={{ drawerIcon: () => (<Icon name="progress-question" size={20} color={theme.colors.primary} />), drawerLabelStyle: { marginLeft: -25 } }} />
              <Drawer.Screen name="Recommandations" component={Recommandations} options={{ drawerIcon: () => (<Icon name="wikipedia" size={20} color={theme.colors.primary} />), drawerLabelStyle: { marginLeft: -25 } }} />
              {/* <Drawer.Screen name="Personal Diary" component={PersonalDiary} />
              <Drawer.Screen name="My Map" component={MyMap} />
              <Drawer.Screen name="Daily Schedule" component={DailySchedule} />
              <Drawer.Screen name="Notifications" component={Notifications} />
              <Drawer.Screen name="Tasks" component={Tasks} />
              <Drawer.Screen name="Guide Feedback" component={GuideFeedback} /> */}
            </>
          ) : (
            <></>
          )}
        </>
      )}
      <Drawer.Screen name="Logout" component={Logout} options={{ drawerIcon: () => (<Icon name="logout" size={20} color={theme.colors.primary} />), drawerLabelStyle: { marginLeft: -25 } }} />
    </Drawer.Navigator>
  );
};

export default StudentDrawer;
