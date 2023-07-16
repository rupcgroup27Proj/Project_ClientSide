import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Tasks from '../../Screens/StudentScreens/Tasks/Tasks';
import Submission from '../../Screens/StudentScreens/Tasks/Submission';

export default function StudentTasksNav() {

    const Stack = createStackNavigator();


    return (
        <Stack.Navigator>
            <Stack.Screen name="Tasks" component={Tasks} options={{ headerShown: false }} />
            <Stack.Screen name="Submission" component={Submission} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

