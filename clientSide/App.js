
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

//Navs
import AdminNav from './Components/Navs/AdminNav';
import StudentNav from './Components/Navs/StudentDrawer'










export default function App() {

  const [user, setUser] = useState({})

  const Tab = createMaterialBottomTabNavigator();
  const Drawer = createDrawerNavigator();


  async function GetLoggedUser() {
    // const loggedUser = await AsyncStorage.getItem('User');
    // setUser(JSON.parse(loggedUser))
    setUser({ Type: 'Student', UserId: 123123 })
  }

  useEffect(() => {
    GetLoggedUser();
  }, [])

  return (
    <SafeAreaProvider>
      <NavigationContainer>

        {user.Type == 'Admin' && <AdminNav/>
         
          //   <Drawer.Screen name="mmmmmm" component={TabNav} />

        }

        {user.Type == 'Student' && <StudentNav/>}
        
 

      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
