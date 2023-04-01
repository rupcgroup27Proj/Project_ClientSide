import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { Button, Divider, RadioButton, Title } from 'react-native-paper';
import { useUser } from '../../../Components/Contexts/UserContext';
import { styles } from './QuestionnaireStyles'


const Questionnaire = ({ route }) => {

  const { questionnaire } = route.params;
  const getCorrectAnswers = () => {
    const arr = [];
    questionnaire.Questions.forEach(question => { arr.push(question.CorrectOption) });
    return arr
  }
  const [answers, setAnswers] = useState(new Array(questionnaire.Questions.length).fill(null));
  const [correctAnswers, setCorrectAnswers] = useState(getCorrectAnswers);
  const [isCompleted, setIsCompleted] = useState(false);
  const { currentUser } = useUser();


  useEffect(() => {
    (async function () {
      setAnswers(new Array(questionnaire.Questions.length).fill(null))
      const completedQuestionnaires = await AsyncStorage.getItem('completedQuestionnaires');
      if (!completedQuestionnaires)
        return
      const isSubmitted = JSON.parse(completedQuestionnaires).includes(parseInt(questionnaire.Id));
      setIsCompleted(isSubmitted);
    })()
  }, [questionnaire.Id])



  const handleAnswer = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const calculateGrade = () => {
    let numerator = 0;
    let denominator = correctAnswers.length;
    answers.forEach((answer, index) => {
      if (answer == correctAnswers[index])
        numerator++;
    });
    return (Math.floor((numerator / denominator) * 100))
  }

  const updateStudentSmartElementTags = async () => {
    console.log("inUpdate")
    const studentTags = questionnaire.Tags;
    const qId = parseInt(questionnaire.Id);
    const cqs = await AsyncStorage.getItem('completedQuestionnaires');
    axios.put(`http://10.0.2.2:5283/api/Questionnaires/studentId/${currentUser.id}`, studentTags)
      .then((res) => {
        console.log(cqs)
        if (cqs != null)
          AsyncStorage.setItem('completedQuestionnaires', JSON.stringify([...(JSON.parse(cqs)), qId]));
        else
          AsyncStorage.setItem('completedQuestionnaires', JSON.stringify([qId]));
      })
      .catch((err) => console.log(err))
    setIsCompleted(true);
  }

  const handleSubmit = () => {
    if (answers.includes(null)) {
      Alert.alert('Error', 'All questions must be checked.');
      return;
    }
    const grade = calculateGrade();
    Alert.alert('Grade', `Your grade is ${grade}.`);
    if (grade < 55) {
      updateStudentSmartElementTags();
    }
  };


  const renderQuestion = (question, index) => {
    return (

      <View key={question.Text} style={styles.question}>
        <Title style={styles.questionTitle}>{question.Text}</Title>
        <View style={styles.radioGroup}>

          {question.Options.map((option) => (
            <>
              <RadioButton.Item
                style={{
                  backgroundColor: '#0096FF',
                  marginVertical: 1,
                  borderRadius: 8,
                  opacity: !isCompleted ? 0.7 : 0.4
                }}
                disabled={isCompleted}
                key={option.choiceId}
                label={option.text}
                value={option.choiceId}
                status={answers[index] === option.text ? 'checked' : 'unchecked'}
                onPress={() => handleAnswer(index, option.text)}
                labelStyle={styles.radioLabel}
              />
            </>
          ))}
        </View>
        <Divider></Divider>
      </View>

    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Title style={styles.title}>{questionnaire.Title}</Title>
        <Title style={styles.description}>{questionnaire.Description}</Title>
        <Divider></Divider>
        {questionnaire.Questions.map(renderQuestion)}
        <Button mode="contained" onPress={handleSubmit} style={styles.submitButton} disabled={isCompleted}>
          {isCompleted ? 'Already submitted' : 'Submit'}
        </Button>
      </View>
    </ScrollView>
  );
};



export default Questionnaire;
