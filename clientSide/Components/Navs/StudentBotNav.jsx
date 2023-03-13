
import { View, Text } from 'react-native'
import React from 'react'


import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

//Main screens for the tab navigator.
import Home from "../../Screens/StudentScreens/Home/Home"
import MyMap from "../../Screens/StudentScreens/MyMap/MyMap"
import SocialCloud from "../../Screens/StudentScreens/SocialCloud/SocialCloud"
import Recommendations from "../../Screens/StudentScreens/Recommendations/Recommendations"
import Tasks from "../../Screens/StudentScreens/Tasks/Tasks"


const StudentBotNav = () => {

    const Tab = createMaterialBottomTabNavigator();

    return (
        <Tab.Navigator>
            <Tab.Screen name="Tasks" component={Tasks} options={{ tabBarIcon: "book-open-page-variant" }} />
            <Tab.Screen name="recommand" component={Recommendations} options={{ tabBarIcon: "view-grid-plus" }} />
            <Tab.Screen name="Home" component={Home} options={{ tabBarIcon: "home" }} />
            <Tab.Screen name="Social Cloud" component={SocialCloud} options={{ tabBarIcon: "cloud" }} />
            <Tab.Screen name="My Map" component={MyMap} options={{ tabBarIcon: "map" }} />
        </Tab.Navigator>
    )
}

export default StudentBotNav