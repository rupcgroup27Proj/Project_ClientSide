import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Divider, RadioButton, Title } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from './QuestionnaireStyles';


const Questionnaire = ({ route }) => {

    const { questionnaire } = route.params;

    const renderQuestion = (question, qindex) => {
        return (
            <View key={question.Text} style={styles.question}>
                <Title style={styles.questionTitle}>{question.Text}</Title>
                <View style={styles.radioGroup}>
                    {question.Options.map((option, oindex) => (
                        <RadioButton.Item
                            style={{ backgroundColor: '#0096FF', borderWidth: 0.2, marginVertical: 1, borderRadius: 8, opacity: 1 }}
                            disabled={true}
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
