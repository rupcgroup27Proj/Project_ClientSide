import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Divider, RadioButton, Title, useTheme } from 'react-native-paper';

import { styles } from './QuestionnaireStyles';
import { useNavigation } from '@react-navigation/native';


const Questionnaire = ({ route }) => {

    const { questionnaire } = route.params;
    const theme = useTheme();
    const navigation = useNavigation();

    const renderQuestion = (question, qindex) => {
        return (
            <View key={question.Text} style={styles.question}>
                <Title style={styles.questionTitle}>{question.Text}</Title>
                <View style={styles.radioGroup}>
                    {question.Options.map((option, oindex) => (
                        <RadioButton.Item
                            style={{ backgroundColor: theme.colors.primary, borderWidth: 0.2, marginVertical: 1, borderRadius: 8, opacity: 0.7 }}
                            key={option.choiceId}
                            label={option.text}
                            value={option.choiceId}
                            status={option.text === question.CorrectOption ? 'checked' : 'unchecked'}
                        />
                    ))}
                </View>
                <Divider />
            </View>
        );
    }


    return (
        <ScrollView>
            <Text style={{ backgroundColor: 'white', color: theme.colors.primary, fontWeight: 'bold' }} onPress={() => navigation.navigate('AllQuestionnaires')}>{`<--back`}</Text>
            <View style={styles.container}>
                <Title style={styles.title}>{questionnaire.Title}</Title>
                <Title style={styles.description}>{questionnaire.Description}</Title>
                <Divider />
                {questionnaire.Questions.map(renderQuestion)}
            </View>
        </ScrollView>
    );
};

export default Questionnaire;
