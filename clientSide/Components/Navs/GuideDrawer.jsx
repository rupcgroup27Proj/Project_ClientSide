import 'react-native-gesture-handler'; //By React Navigation docs, this import must always be imported first!
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
//Guide screens
import Home from '../../Screens/GuideScreens/Home/Home'
import DailySchedule from '../../Screens/GuideScreens/DailySchedule/DailySchedule'
import Profile from '../../Screens/SharedScreens/Profile/Profile'
import GuideFeedback from '../../Screens/GuideScreens/GuideFeedback/GuideFeedback'
import Questionnaires from '../SubNavs/QuestionnairesNav'

const GuideDrawer = () => {

  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Daily Schedule" component={DailySchedule} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Guide Feedback" component={GuideFeedback} />
      <Drawer.Screen name="All Questionnaires" component={Questionnaires} />
    </Drawer.Navigator>
  )
}

export default GuideDrawer