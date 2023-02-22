
import { View, Text } from 'react-native'
import React from 'react'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import TEST from '../General/TEST';
import Home from "../../Screens/StudentScreens/Home/Home"

const StudentNav = () => {

    const Tab = createMaterialBottomTabNavigator();

    return (
                <Tab.Navigator>
                    <Tab.Screen name="Home" component={Home} options={{ tabBarIcon: "home" }} />
                    <Tab.Screen name="Test" component={TEST} options={{ tabBarIcon: "test-tube" }} />
                </Tab.Navigator>
    )
}

export default StudentNav