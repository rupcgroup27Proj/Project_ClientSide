import React, { useCallback, useEffect, useState } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { Button, Divider, IconButton, List, Text, useTheme } from 'react-native-paper';
import axios from 'axios';
import { useUser } from '../../../Components/Contexts/UserContext';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from './QuestionnaireStyles';
import { useFocusEffect } from '@react-navigation/native';
import { useAPI } from '../../../Components/Contexts/APIContext';


const AllQuestionnaires = ({ navigation }) => {

    const theme = useTheme();
    const { currentUser } = useUser();
    const [questionnaires, setQuestionnaires] = useState([]);
    const { simulatorAPI } = useAPI();
    useFocusEffect(
        useCallback(() => {
            navigation.setOptions({
                headerShown: false,
            });
        }, []))


    const getAllQuestionnaires = async () => {
        try {
            const response = await axios.get(`${simulatorAPI}/api/Questionnaires/groupId/${currentUser.groupId}`);
            setQuestionnaires(response.data);
        } catch (error) { console.log(error); }
    }

    useEffect(() => {
        getAllQuestionnaires();
    }, [])


    const handlePress = (questionnaire) => {
        navigation.navigate('Questionnaire', { questionnaire });
    };

    const goToNewQ = () => {
        navigation.navigate('New Questionnaire', { getAllQuestionnaires });
    }

    const deleteQuestionnaire = async (questionnaireId, questionnaireTitle) => {
        Alert.alert(
            'Title',
            `Are you sure you want to delete "${questionnaireTitle}"?`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => { return }
                },
                {
                    text: 'OK',
                    onPress: () => {
                        axios.delete(`${simulatorAPI}/api/Questionnaires/questionnaireId/${questionnaireId}`)
                            .then((res) => {
                                getAllQuestionnaires();
                            })
                            .catch((err) => console.log(err))
                    },
                },
            ],
            { cancelable: false }
        );
    }

    return (
        <View>

            <Text style={{ marginVertical: 10, marginLeft: 5, fontSize: 16 }}>All questionnaires that was created by you:</Text>

            <ScrollView style={{ height: '80%' }}>

                {!questionnaires.length
                    ? <>
                        <Divider bold={true} />
                        <Text style={{ textAlign: 'center', fontSize: 18, color: theme.colors.primary, fontWeight: 'bold' }}>None</Text>
                    </>
                    :
                    <List.Section>
                        {questionnaires.map((questionnaire, index) => (
                            <TouchableOpacity key={questionnaire.Id} onPress={() => handlePress(questionnaire)}>
                                <Divider bold={true} />
                                <List.Item
                                    style={{ borderLeftWidth: 7, borderLeftColor: (index % 2 == 0) ? theme.colors.primary : theme.colors.primarySec }}
                                    key={questionnaire.Id}
                                    title={questionnaire.Title}
                                    titleNumberOfLines={2}
                                    description={questionnaire.Description != "" ? questionnaire.Description : " "}
                                    left={(item) => <List.Icon {...item} icon="file-question-outline" />}
                                    right={() => <IconButton onPress={() => deleteQuestionnaire(questionnaire.Id, questionnaire.Title)} icon="delete" size={20} />}
                                />
                                <Divider bold={true} />
                            </TouchableOpacity>
                        ))}
                    </List.Section>
                }
            </ScrollView>

            <Divider bold={true} />
            <Button icon="text-box-plus" mode="contained" onPress={goToNewQ} style={styles.submitButton}>
                Create new questionnaire
            </Button>
        </View>
    );
};

export default AllQuestionnaires;