import 'react-native-gesture-handler'; //By React Navigation docs, this import must always be imported first!
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';

//Admin Screens
import AddDelegations from '../../Screens/AdminScreens/Delegations/AddDelegations/AddDelegations'
import AllDelegetions from '../../Screens/AdminScreens/Delegations/AllDelegations/AllDelegetions'
import AddUsers from '../../Screens/SharedScreens/Users/AddUsers/AddUsers'
import AllUsers from '../../Screens/SharedScreens/Users/AllUsers/AllUsers'


const AdminNav = () => {

    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Create a delegation" component={AddDelegations} />
            <Drawer.Screen name="All delegations" component={AllDelegetions} />
            <Drawer.Screen name="Add new user" component={AddUsers} />
            <Drawer.Screen name="All users" component={AllUsers} />
        </Drawer.Navigator>
    )
}

export default AdminNav