import 'react-native-gesture-handler'; //By React Navigation docs, this import must always be imported first!
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
//Student screens
import Home from '../../Screens/StudentScreens/Home/Home'
import SocialCloud from '../../Screens/SharedScreens/SocialCloud/SocialCloud'
import Recommandations from '../../Screens/StudentScreens/Recommendations/Recommendations'
import MyMap from '../../Screens/StudentScreens/MyMap/MyMap'
import DailySchedule from '../../Screens/SharedScreens/DailySchedule/DailySchedule'
import Notifications from '../../Screens/StudentScreens/Notifications/Notifications'
import Tasks from '../../Screens/StudentScreens/Tasks/Tasks'
import PersonalDiary from '../../Screens/StudentScreens/PersonalDiary/PersonalDiary'
import Profile from '../../Screens/SharedScreens/Profile/Profile'
import GuideFeedback from '../../Screens/SharedScreens/GuideFeedback/GuideFeedback'
import Questionnaires from '../SubNavs/QuestionnairesNav'


const StudentDrawer = () => {

  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Social Cloud" component={SocialCloud} />
      <Drawer.Screen name="Recommandations" component={Recommandations} />
      <Drawer.Screen name="My Map" component={MyMap} />
      <Drawer.Screen name="Daily Schedule" component={DailySchedule} />
      <Drawer.Screen name="Notifications" component={Notifications} />
      <Drawer.Screen name="Tasks" component={Tasks} />
      <Drawer.Screen name="Personal Diary" component={PersonalDiary} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Guide Feedback" component={GuideFeedback} />
      <Drawer.Screen name="Questionnaires" component={Questionnaires} />
    </Drawer.Navigator>
  )
}

export default StudentDrawer