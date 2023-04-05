import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { Button, Divider, RadioButton, Title } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useUser } from '../../../Components/Contexts/UserContext';
import { styles } from './QuestionnaireStyles';


const Questionnaire = ({ route }) => {

  const { questionnaire } = route.params;

  const getCorrectAnswers = () => {
    const arr = [];
    questionnaire.Questions.forEach(question => { arr.push(question.CorrectOption) });
    return arr;
  }
  const [answers, setAnswers] = useState(new Array(questionnaire.Questions.length).fill(null));
  const [correctAnswers, setCorrectAnswers] = useState(getCorrectAnswers);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completedOptions, setCompletedOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const { currentUser } = useUser();

  useEffect(() => {
    (async function () {
      setAnswers(new Array(questionnaire.Questions.length).fill(null))
      const completedQuestionnaires = await AsyncStorage.getItem('completedQuestionnaires');
      console.log(completedQuestionnaires)
      if (!completedQuestionnaires) {
        setIsLoading(false);
        return;
      }

      const isSubmitted = JSON.parse(completedQuestionnaires).includes(parseInt(questionnaire.Id));
      setIsCompleted(isSubmitted);
      const cqOptions = await AsyncStorage.getItem('chosenOptions');
      if (!cqOptions) {
        setIsLoading(false);
        return;
      }
      setCompletedOptions(JSON.parse(cqOptions));
      setIsLoading(false);
    })()
  }, [questionnaire.Id, isCompleted])


  const handleAnswer = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  }

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
    const studentTags = questionnaire.Tags;
    axios.put(`http://10.0.2.2:5283/api/Questionnaires/studentId/${currentUser.id}`, studentTags)
      .then((res) => { console.log("User tags updated.") })
      .catch((err) => console.log(err));
  }

  const handleSubmit = () => {
    if (answers.includes(null)) {
      Alert.alert('Error', 'All questions must be checked.');
      return;
    }

    const grade = calculateGrade();
    Alert.alert('Grade', `Your grade is ${grade}.`);
    if (grade < 55)
      updateStudentSmartElementTags();

    //Insert the questionnaire to asyncStorage for disabling it in future attempts to answer it again
    (async function () {
      const qId = parseInt(questionnaire.Id);
      const cqs = await AsyncStorage.getItem('completedQuestionnaires');
      if (cqs != null)
        AsyncStorage.setItem('completedQuestionnaires', JSON.stringify([...(JSON.parse(cqs)), qId]));
      else
        AsyncStorage.setItem('completedQuestionnaires', JSON.stringify([qId]));

      //Stores the answers for conditional styling
      const chosenOptions = await AsyncStorage.getItem('chosenOptions');
      const options = {
        cQuestionnaireId: qId,
        cOptions: answers
      }
      if (chosenOptions != null)
        AsyncStorage.setItem('chosenOptions', JSON.stringify([...(JSON.parse(chosenOptions)), options]));
      else
        AsyncStorage.setItem('chosenOptions', JSON.stringify([options]));
      setIsCompleted(true)
    })()
  }

  const determineBgColor = (questionnaireId, questionIndex, optionText) => {
    const questionnaire = completedOptions.find(q => q['cQuestionnaireId'] == questionnaireId);
    if (questionnaire != undefined && questionnaire.cOptions[questionIndex] == correctAnswers[questionIndex] && questionnaire.cOptions[questionIndex] == optionText)
      return 'rgba(0, 255, 0, 0.8)'
    if (questionnaire != undefined && questionnaire.cOptions[questionIndex] == optionText)
      return 'rgba(255, 0, 0, 0.8)'
    return 'white'
  }

  const renderQuestion = (question, qindex) => {
    return (
      <View key={question.Text} style={styles.question}>
        <Title style={styles.questionTitle}>{question.Text}</Title>
        <View style={styles.radioGroup}>
          {question.Options.map((option, oindex) => (
            <RadioButton.Item
              style={{ backgroundColor: isCompleted ? determineBgColor(questionnaire.Id, qindex, option.text) : '#0096FF', borderWidth: 0.2, marginVertical: 1, borderRadius: 8, opacity: !isCompleted ? 1 : 0.8 }}
              disabled={isCompleted}
              key={option.choiceId}
              label={option.text}
              value={option.choiceId}
              status={answers[qindex] === option.text ? 'checked' : 'unchecked'}
              onPress={() => handleAnswer(qindex, option.text)}
              labelStyle={styles.radioLabel}
            />
          ))}
        </View>
        <Divider />
      </View>
    );
  }


  return (
    <>
      {isLoading
        ?
        <></>
        :
        (<ScrollView>
          <View style={styles.container}>
            <Title style={styles.title}>{questionnaire.Title}</Title>
            <Title style={styles.description}>{questionnaire.Description}</Title>
            <Divider />
            {questionnaire.Questions.map(renderQuestion)}
            <Button mode="contained" onPress={handleSubmit} style={styles.submitButton} disabled={isCompleted}>
              {isCompleted ? 'Already submitted' : 'Submit'}
            </Button>
          </View>
        </ScrollView>)}
    </>
  );
};

export default Questionnaire;
