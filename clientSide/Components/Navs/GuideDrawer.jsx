import 'react-native-gesture-handler'; //By React Navigation docs, this import must always be imported first!
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
//Guide screens
import Home from '../../Screens/GuideScreens/Home/Home'
import DailySchedule from '../../Screens/GuideScreens/DailySchedule/DailySchedule'
import Profile from '../../Screens/SharedScreens/Profile/Profile'
import GuideFeedback from '../../Screens/GuideScreens/GuideFeedback/GuideFeedback'
import Questionnaires from '../SubNavs/QuestionnairesNav'
import Logout from '../../Screens/SharedScreens/Logout/Logout'
import { useTeacher } from '../Contexts/TeacherContext';

const GuideDrawer = () => {

  const { journeyStarted, remainingDays } = useTeacher();
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      {journeyStarted && (
        <>
          <Drawer.Screen name="Profile" component={Profile} />
          {remainingDays <= 0 ?
            <>
              <Drawer.Screen name="All Questionnaires" component={Questionnaires} />
              <Drawer.Screen name="Guide Feedback" component={GuideFeedback} />
            </>
            : <>
            </>
          }
        </>
      )}
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  )
}

export default GuideDrawer