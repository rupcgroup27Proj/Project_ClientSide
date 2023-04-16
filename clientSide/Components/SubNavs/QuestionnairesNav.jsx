import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { useUser } from '../Contexts/UserContext';
//Questionnaires screens
import SQuestionnaires from '../../Screens/StudentScreens/Questionnaires/AllQuestionnaires';
import SQuestionnaire from '../../Screens/StudentScreens/Questionnaires/Questionnaire';
import GQuestionnaires from '../../Screens/GuideScreens/Questionnaires/AllQuestionnaires';
import GQuestionnaire from '../../Screens/GuideScreens/Questionnaires/Questionnaire';
import NewQuestionnaire from '../../Screens/GuideScreens/Questionnaires/NewQuestionnaire';


export default function QuestionnairesNav() {

    const Stack = createStackNavigator();
    const { currentUser } = useUser();


    return (
        <Stack.Navigator>
            <Stack.Screen name="AllQuestionnaires" component={currentUser.type == 'Student' ? SQuestionnaires : GQuestionnaires} options={{ headerShown: false }} />
            <Stack.Screen name="Questionnaire" component={currentUser.type == 'Student' ? SQuestionnaire : GQuestionnaire} options={{ headerShown: false }} />
            <Stack.Screen name="New Questionnaire" component={NewQuestionnaire} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

