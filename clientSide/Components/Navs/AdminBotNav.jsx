import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
//Main screens for the tab navigator.
import AddSchool from '../../Screens/AdminScreens/Delegations/AddDelegations/AddSchool'
import AllDelegetions from '../../Screens/AdminScreens/Delegations/AllDelegations/AllDelegetions'
import Logout from '../../Screens/SharedScreens/Logout/Logout'
import Home from '../../Screens/AdminScreens/Home/Home'


const AdminBotNav = () => {

    const Tab = createMaterialBottomTabNavigator();

    return (
        <Tab.Navigator barStyle={{ backgroundColor: '#161B1F' }} activeColor='white' inactiveColor='grey'  >
            <Tab.Screen name="Home" component={Home} options={{ tabBarIcon: "home" }} />
            <Tab.Screen name="Add Delegation" component={AddSchool} options={{ tabBarIcon: "airplane-plus" }} />
            <Tab.Screen name="All Delegetions" component={AllDelegetions} options={{ tabBarIcon: "calendar-month"}} />
            <Tab.Screen name="Logout" component={Logout} options={{ tabBarIcon: "logout" }} />
        </Tab.Navigator>
    )
}

export default AdminBotNav