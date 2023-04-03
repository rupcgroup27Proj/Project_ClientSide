import React, { useCallback, useEffect, useState } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { Button, Divider, IconButton, List, Text } from 'react-native-paper';
import axios from 'axios';
import { useUser } from '../../../Components/Contexts/UserContext';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from './QuestionnaireStyles';
import { useFocusEffect } from '@react-navigation/native';

const AllQuestionnaires = ({ navigation }) => {

    const { currentUser } = useUser();
    const [questionnaires, setQuestionnaires] = useState([]);

    useFocusEffect(
        useCallback(() => {
            navigation.setOptions({
                headerShown: false,
            });
        }, []))


    const getAllQuestionnaires = async () => {
        try {
            const response = await axios.get(`http://10.0.2.2:5283/api/Questionnaires/groupId/${currentUser.groupId}`);
            setQuestionnaires(response.data);
        } catch (error) { console.log(error); }
    }

    useEffect(() => {
        getAllQuestionnaires()
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
                        axios.delete(`http://10.0.2.2:5283/api/Questionnaires/questionnaireId/${questionnaireId}`)
                            .then((res) => {
                                console.log(res);
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
            <Text style={{ marginVertical: 10, marginLeft: 5 }}>All questionnaires created by you:</Text>
            <Divider bold={true} />
            <ScrollView style={{ height: '80%' }}>
                <List.Section>
                    {questionnaires.map((questionnaire) => (
                        <TouchableOpacity key={questionnaire.Id} onPress={() => handlePress(questionnaire)}>
                            <List.Item
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
            </ScrollView>
            <Divider bold={true} />
            <Button icon="text-box-plus" mode="contained" onPress={goToNewQ} style={styles.submitButton}>
                Create new questionnaire
            </Button>
        </View>
    );
};

export default AllQuestionnaires;