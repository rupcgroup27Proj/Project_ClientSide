import 'react-native-gesture-handler'; //By React Navigation docs, this import must always be imported first!
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTeacher } from '../Contexts/TeacherContext';
import { useTheme } from "react-native-paper";
//Guide screens:
import Home from '../../Screens/GuideScreens/Home/Home';
import Profile from '../../Screens/SharedScreens/Profile/Profile';
import Questionnaires from '../SubNavs/QuestionnairesNav';
import GuideFeedback from '../../Screens/SharedScreens/GuideFeedback/GuideFeedback';
import DailySchedule from '../../Screens/GuideScreens/DailySchedule/DailySchedule';
import Logout from '../../Screens/SharedScreens/Logout/Logout';


const GuideDrawer = () => {

  const { journeyStarted, remainingDays, endDate } = useTeacher();
  const Drawer = createDrawerNavigator();
  const theme = useTheme();


  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} options={{ drawerIcon: () => (<Icon name="home" size={20} color={theme.colors.primary} />), drawerLabelStyle: { marginLeft: -25 } }} />
      {journeyStarted && (
        <>
          {/* <Drawer.Screen name="Profile" component={Profile} options={{ drawerIcon: () => (<Icon name="account-circle" size={20} color={theme.colors.primary} />), drawerLabelStyle: { marginLeft: -25 } }} /> */}
          {remainingDays <= 0 ?
            <>
              <Drawer.Screen name="All Questionnaires" component={Questionnaires} options={{ drawerIcon: () => (<Icon name="progress-question" size={20} color={theme.colors.primary} />), drawerLabelStyle: { marginLeft: -25 } }} />
              {new Date().toISOString() > endDate ? (
                <>
                  <Drawer.Screen name="Guide Feedback" component={GuideFeedback} options={{ drawerIcon: () => (<Icon name="comment-quote-outline" size={20} color={theme.colors.primary} />), drawerLabelStyle: { marginLeft: -25 } }}/>
                </>
              ) : (<></>)
              }

            </>
            : <>
            </>
          }
        </>
      )}
      <Drawer.Screen name="Logout" component={Logout} options={{ drawerIcon: () => (<Icon name="logout" size={20} color={theme.colors.primary} />), drawerLabelStyle: { marginLeft: -25 } }} />
    </Drawer.Navigator>
  )
}

export default GuideDrawer