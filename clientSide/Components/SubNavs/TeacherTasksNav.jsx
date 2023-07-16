import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Tasks from '../../Screens/TeacherScreens/Tasks/Tasks';
import NewTask from '../../Screens/TeacherScreens/Tasks/NewTask';
import SpecificTask from '../../Screens/TeacherScreens/Tasks/SpecificTask';

export default function TeacherTasksNav() {

    const Stack = createStackNavigator();


    return (
        <Stack.Navigator>
            <Stack.Screen name="Tasks" component={Tasks} options={{ headerShown: false }} />
            <Stack.Screen name="NewTask" component={NewTask} options={{ headerShown: false }} />
            <Stack.Screen name="SpecificTask" component={SpecificTask} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

