import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { useUser } from '../Contexts/UserContext';
//SocialFeed screens
import SocialFeed from '../../Screens/StudentScreens/SocialCloud/SocialFeed';
import NewPost from '../../Screens/StudentScreens/SocialCloud/NewPost';
import Comments from '../../Screens/StudentScreens/SocialCloud/Comments';


export default function SocialFeedNav() {

    const Stack = createStackNavigator();
    const { currentUser } = useUser();


    return (
        <Stack.Navigator>
            <Stack.Screen name="Social Feed" component={SocialFeed} options={{ headerShown: false }} />
            <Stack.Screen name="New Post" component={NewPost} options={{ headerShown: false }} />
            <Stack.Screen name="Comments" component={Comments} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

