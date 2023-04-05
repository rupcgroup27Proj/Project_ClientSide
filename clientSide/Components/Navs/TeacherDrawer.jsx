import 'react-native-gesture-handler'; //By React Navigation docs, this import must always be imported first!
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
//Teacher screens
import Home from '../../Screens/TeacherScreens/Home/Home'
import SocialCloud from '../SubNavs/SocialFeedNav'
import DailySchedule from '../../Screens/SharedScreens/DailySchedule/DailySchedule'
import Notifications from '../../Screens/TeacherScreens/Notifications/Notifications'
import Tasks from '../../Screens/TeacherScreens/Tasks/Tasks'
import Profile from '../../Screens/SharedScreens/Profile/Profile'
import GuideFeedback from '../../Screens/SharedScreens/GuideFeedback/GuideFeedback'
import AddUsers from '../../Screens/SharedScreens/Users/AddUsers/AddUsers'
import AllUsers from '../../Screens/SharedScreens/Users/AllUsers/AllUsers'
import Logout from '../../Screens/SharedScreens/Logout/Logout'
import ImprtntNum from '../../Screens/TeacherScreens/ImportantNumbers/ImprtntNum';
import { useTeacher } from '../Contexts/TeacherContext';


const TeacherDrawer = () => {

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
              <Drawer.Screen name="Social Cloud" component={SocialCloud} />
              <Drawer.Screen name="Daily Schedule" component={DailySchedule} />
              <Drawer.Screen name="Notifications" component={Notifications} />
              <Drawer.Screen name="Tasks" component={Tasks} />
              <Drawer.Screen name="Guide Feedback" component={GuideFeedback} />
            </>
            : <>
              <Drawer.Screen name="Add new student" component={AddUsers} />
            </>
          }
        </>
      )}
      <Drawer.Screen name="All students" component={AllUsers} />
      <Drawer.Screen name="Important numbers" component={ImprtntNum} />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  )
}

export default TeacherDrawer