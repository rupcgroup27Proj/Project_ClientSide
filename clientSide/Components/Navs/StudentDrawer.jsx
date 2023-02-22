import 'react-native-gesture-handler'; //By React Navigation docs, this import must always be imported first!
import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';

//Student screens
import Home from '../../Screens/StudentScreens/Home/Home'
import SocialCloud from '../../Screens/StudentScreens/SocialCloud/SocialFeed'
import Recommandations from '../../Screens/StudentScreens/Recommendations/Recommendations'
import MyMap from '../../Screens/StudentScreens/MyMap/MyMap'
import DailySchedule from '../../Screens/StudentScreens/DailySchedule/DailySchedule'
import Notifications from '../../Screens/StudentScreens/Notifications/Notifications'
import Tasks from '../../Screens/StudentScreens/Tasks/Tasks'
import PersonalDiary from '../../Screens/StudentScreens/PersonalDiary/PersonalDiary'
import Profile from '../../Screens/StudentScreens/Profile/Profile'
import GuideFeedback from '../../Screens/StudentScreens/GuideFeedback/GuideFeedback'

const StudentDrawer = () => {

  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator>
         <Drawer.Screen name="Home" component={Home}/>
         <Drawer.Screen name="Social Cloud" component={SocialCloud}/>
         <Drawer.Screen name="Recommandations" component={Recommandations}/>
         <Drawer.Screen name="My Map" component={MyMap}/>
         <Drawer.Screen name="Daily Schedule" component={DailySchedule}/>
         <Drawer.Screen name="Notifications" component={Notifications}/>
         <Drawer.Screen name="Tasks" component={Tasks}/>
         <Drawer.Screen name="Personal Diary" component={PersonalDiary}/>
         <Drawer.Screen name="Profile" component={Profile}/>
         <Drawer.Screen name="Guide Feedback" component={GuideFeedback}/>
    </Drawer.Navigator>
  )
}

export default StudentDrawer