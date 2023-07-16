import "react-native-gesture-handler"; //By React Navigation docs, this import must always be imported first!
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useTeacher } from "../Contexts/TeacherContext";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from "react-native-paper";
//Student screens:
import Home from "../../Screens/StudentScreens/Home/Home";
import Profile from "../../Screens/SharedScreens/Profile/Profile";
import SocialCloud from "../SubNavs/SocialFeedNav";
import Favorites from "../../Screens/StudentScreens/Favorites/Favorites";
import Questionnaires from "../SubNavs/QuestionnairesNav";
import Recommandations from "../../Screens/StudentScreens/Recommendations/Recommendations";
import MyMap from "../../Screens/StudentScreens/MyMap/MyMap";
import DailySchedule from "../../Screens/SharedScreens/DailySchedule/DailySchedule";
import Notifications from "../../Screens/StudentScreens/Notifications/Notifications";
import StudentTasksNav from "../../Components/SubNavs/StudentTasksNav";

import Submission from "../../Screens/StudentScreens/Tasks/Submission"
import PersonalDiary from "../../Screens/StudentScreens/PersonalDiary/PersonalDiary";
import GuideFeedback from "../../Screens/SharedScreens/GuideFeedback/GuideFeedback";
import Logout from "../../Screens/SharedScreens/Logout/Logout";


const StudentDrawer = () => {

  const { journeyStarted, remainingDays, endDate } = useTeacher();
  const Drawer = createDrawerNavigator();
  const theme = useTheme();

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} options={{ drawerIcon: () => (<Icon name="home" size={20} color={theme.colors.primary} />), drawerLabelStyle: { marginLeft: -25 } }} />
      {journeyStarted && (
        <>
          <Drawer.Screen name="Tasks" component={StudentTasksNav} options={{ drawerIcon: () => (<Icon name="clipboard-text" size={20} color={theme.colors.primary} />), drawerLabelStyle: { marginLeft: -25 } }} />
          {/* <Drawer.Screen name="Profile" component={Profile} options={{ drawerIcon: () => (<Icon name="account-circle" size={20} color={theme.colors.primary} />), drawerLabelStyle: { marginLeft: -25 } }} /> */}
          {remainingDays <= 0 ? (
            <>
              <Drawer.Screen name="Social Cloud" component={SocialCloud} options={{ drawerIcon: () => (<Icon name="cloud" size={20} color={theme.colors.primary} />), drawerLabelStyle: { marginLeft: -25 } }} />
              <Drawer.Screen name="Favorites" component={Favorites} options={{ drawerIcon: () => (<Icon name="bookmark-multiple" size={20} color={theme.colors.primary} />), drawerLabelStyle: { marginLeft: -25 } }} />
              <Drawer.Screen name="Questionnaires" component={Questionnaires} options={{ drawerIcon: () => (<Icon name="progress-question" size={20} color={theme.colors.primary} />), drawerLabelStyle: { marginLeft: -25 } }} />
              <Drawer.Screen name="Recommandations" component={Recommandations} options={{ drawerIcon: () => (<Icon name="wikipedia" size={20} color={theme.colors.primary} />), drawerLabelStyle: { marginLeft: -25 } }} />
              <Drawer.Screen name="My Map" component={MyMap} options={{ drawerIcon: () => (<Icon name="map" size={20} color={theme.colors.primary} />), drawerLabelStyle: { marginLeft: -25 } }} />
              {/* <Drawer.Screen name="Submission" component={Submission} /> */}
              {new Date().toISOString() > endDate ? (
                <>
                  <Drawer.Screen name="Guide Feedback" component={GuideFeedback} options={{ drawerIcon: () => (<Icon name="comment-quote-outline" size={20} color={theme.colors.primary} />), drawerLabelStyle: { marginLeft: -25 } }} />
                </>
              ) : (<></>)
              }

              {/* <Drawer.Screen name="Personal Diary" component={PersonalDiary} />
              <Drawer.Screen name="Daily Schedule" component={DailySchedule} />
              <Drawer.Screen name="Notifications" component={Notifications} />
              
              */}
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
