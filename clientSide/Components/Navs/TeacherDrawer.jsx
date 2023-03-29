import 'react-native-gesture-handler'; //By React Navigation docs, this import must always be imported first!
import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';

//Teacher screens
import Home from '../../Screens/TeacherScreens/Home/Home'
import SocialCloud from '../../Screens/SharedScreens/SocialCloud/SocialCloud'
import DailySchedule from '../../Screens/SharedScreens/DailySchedule/DailySchedule'
import Notifications from '../../Screens/TeacherScreens/Notifications/Notifications'
import Tasks from '../../Screens/TeacherScreens/Tasks/Tasks'
import Profile from '../../Screens/SharedScreens/Profile/Profile'
import GuideFeedback from '../../Screens/SharedScreens/GuideFeedback/GuideFeedback'
import AddUsers from '../../Screens/SharedScreens/Users/AddUsers/AddUsers'
import AllUsers from '../../Screens/SharedScreens/Users/AllUsers/AllUsers'

const TeacherDrawer = () => {

  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator>

      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Social Cloud" component={SocialCloud} />
      <Drawer.Screen name="Daily Schedule" component={DailySchedule} />
      <Drawer.Screen name="Notifications" component={Notifications} />
      <Drawer.Screen name="Tasks" component={Tasks} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Guide Feedback" component={GuideFeedback} />
      <Drawer.Screen name="Add new user" component={AddUsers} />
      <Drawer.Screen name="All users" component={AllUsers} />


    </Drawer.Navigator>
  )
}

export default TeacherDrawer