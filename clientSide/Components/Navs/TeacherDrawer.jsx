import 'react-native-gesture-handler'; //By React Navigation docs, this import must always be imported first!
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTeacher } from '../Contexts/TeacherContext';
import { useTheme } from "react-native-paper";
//Teacher screens
import Home from '../../Screens/TeacherScreens/Home/Home';
import Profile from '../../Screens/SharedScreens/Profile/Profile';
import AllUsers from '../../Screens/SharedScreens/Users/AllUsers/AllUsers';
import ImprtntNum from '../../Screens/TeacherScreens/ImportantNumbers/ImprtntNum';
import SocialCloud from '../SubNavs/SocialFeedNav';
import AddUsers from '../../Screens/SharedScreens/Users/AddUsers/AddUsers';
import DailySchedule from '../../Screens/SharedScreens/DailySchedule/DailySchedule';
import Notifications from '../../Screens/TeacherScreens/Notifications/Notifications';
import Tasks from '../../Screens/TeacherScreens/Tasks/Tasks';
import GuideFeedback from '../../Screens/SharedScreens/GuideFeedback/GuideFeedback';
import Logout from '../../Screens/SharedScreens/Logout/Logout';
import NewTask from '../../Screens/TeacherScreens/Tasks/NewTask';
import SpecificTask from '../../Screens/TeacherScreens/Tasks/SpecificTask';


const TeacherDrawer = () => {

  const { journeyStarted, remainingDays } = useTeacher();
  const Drawer = createDrawerNavigator();
  const theme = useTheme();


  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} options={{ drawerIcon: () => (<Icon name="home" size={20} color={theme.colors.primary} />), drawerLabelStyle: { marginLeft: -25 } }} />
      {journeyStarted && (
        <>
          <Drawer.Screen name="Profile" component={Profile} options={{ drawerIcon: () => (<Icon name="account-circle" size={20} color={theme.colors.primary} />), drawerLabelStyle: { marginLeft: -25 } }} />
          <Drawer.Screen name="All students" component={AllUsers} options={{ drawerIcon: () => (<Icon name="account-multiple" size={20} color={theme.colors.primary} />), drawerLabelStyle: { marginLeft: -25 } }} />
          <Drawer.Screen name="Important numbers" component={ImprtntNum} options={{ drawerIcon: () => (<Icon name="phone-log" size={20} color={theme.colors.primary} />), drawerLabelStyle: { marginLeft: -25 } }} />

          {remainingDays <= 0
            ? <>
              <Drawer.Screen name="Social Cloud" component={SocialCloud} options={{ drawerIcon: () => (<Icon name="cloud" size={20} color={theme.colors.primary} />), drawerLabelStyle: { marginLeft: -25 } }} />
              {/* <Drawer.Screen name="Daily Schedule" component={DailySchedule} />
              <Drawer.Screen name="Notifications" component={Notifications} />
              <Drawer.Screen name="Tasks" component={Tasks} />
              <Drawer.Screen name="Guide Feedback" component={GuideFeedback} /> */}
             <Drawer.Screen name="Tasks" component={Tasks} /> 
             <Drawer.Screen name="NewTask" component={NewTask} /> 
             <Drawer.Screen name="SpecificTask" component={SpecificTask} /> 
            </>
            : <>
              <Drawer.Screen name="Add new student" component={AddUsers} options={{ drawerIcon: () => (<Icon name="account-plus" size={20} color={theme.colors.primary} />), drawerLabelStyle: { marginLeft: -25 } }} />
              <Drawer.Screen name="Tasks" component={Tasks} />
              <Drawer.Screen name="NewTask" component={NewTask} /> 
              <Drawer.Screen name="SpecificTask" component={SpecificTask} /> 

            </>
          }
        </>
      )}
      <Drawer.Screen name="Logout" component={Logout} options={{ drawerIcon: () => (<Icon name="logout" size={20} color={theme.colors.primary} />), drawerLabelStyle: { marginLeft: -25 } }} />
    </Drawer.Navigator>
  )
}

export default TeacherDrawer