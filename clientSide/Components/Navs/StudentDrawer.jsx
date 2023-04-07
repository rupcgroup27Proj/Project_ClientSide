import 'react-native-gesture-handler'; //By React Navigation docs, this import must always be imported first!
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
//Student screens
import Home from '../../Screens/StudentScreens/Home/Home'
import SocialCloud from '../SubNavs/SocialFeedNav'
import Recommandations from '../../Screens/StudentScreens/Recommendations/Recommendations'
import MyMap from '../../Screens/StudentScreens/MyMap/MyMap'
import DailySchedule from '../../Screens/SharedScreens/DailySchedule/DailySchedule'
import Notifications from '../../Screens/StudentScreens/Notifications/Notifications'
import Tasks from '../../Screens/StudentScreens/Tasks/Tasks'
import PersonalDiary from '../../Screens/StudentScreens/PersonalDiary/PersonalDiary'
import Profile from '../../Screens/SharedScreens/Profile/Profile'
import GuideFeedback from '../../Screens/SharedScreens/GuideFeedback/GuideFeedback'
import Questionnaires from '../SubNavs/QuestionnairesNav'
import Logout from '../../Screens/SharedScreens/Logout/Logout'
import Favorites from '../../Screens/StudentScreens/Favorites/Favorites';
import { useTeacher } from '../Contexts/TeacherContext';


const StudentDrawer = () => {

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
              <Drawer.Screen name="Favorites" component={Favorites} />
              <Drawer.Screen name="Questionnaires" component={Questionnaires} /> 
              <Drawer.Screen name="Recommandations" component={Recommandations} />
              {/* <Drawer.Screen name="Personal Diary" component={PersonalDiary} />
              <Drawer.Screen name="My Map" component={MyMap} />
              <Drawer.Screen name="Daily Schedule" component={DailySchedule} />
              <Drawer.Screen name="Notifications" component={Notifications} />
              <Drawer.Screen name="Tasks" component={Tasks} />
              <Drawer.Screen name="Guide Feedback" component={GuideFeedback} /> */}
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

export default StudentDrawer