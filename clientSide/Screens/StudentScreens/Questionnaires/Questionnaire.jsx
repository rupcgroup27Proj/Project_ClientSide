import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { Button, Divider, RadioButton, Title } from 'react-native-paper';
import { useUser } from '../../../Components/Contexts/UserContext';
import { styles } from './QuestionnaireStyles'

const Questionnaire = ({ route }) => {
  const getCorrectAnswers = () => {
    const arr = [];
    questionnaire.Questions.forEach(question => {
      arr.push(question.CorrectOption)
    });
    return arr
  }
  const { questionnaire } = route.params;
  const [answers, setAnswers] = useState(Array(questionnaire.Questions.length).fill(null));
  const [correctAnswers, setCorrectAnswers] = useState(getCorrectAnswers);
  const { currentUser } = useUser();

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
    return ((numerator / denominator) * 10)
  }

  const updateStudentSmartElementTags = async () => {
    const studentTags = questionnaire.Tags;
    console.log(studentTags)
    axios.put(`http://10.0.2.2:5283/api/Questionnaires/studentId/${currentUser.id}`, studentTags)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  const handleSubmit = () => {
    console.log(answers)
    console.log(correctAnswers)

    if (answers.includes(null)) {
      Alert.alert('Error', 'All questions must be checked.');
      return;
    }
    const grade = calculateGrade();
    if (grade < 55) {
      updateStudentSmartElementTags();
    }

  };


  const renderQuestion = (question, index) => {
    return (

      <View key={question.Text} style={styles.question}>
        <Title style={styles.questionTitle}>{question.Text}</Title>
        <View style={styles.radioGroup}>
          <Divider></Divider>
          {question.Options.map((option) => (
            <>
              <RadioButton.Item
                key={option.choiceId}
                label={option.text}
                value={option.choiceId}
                status={answers[index] === option.text ? 'checked' : 'unchecked'}
                onPress={() => handleAnswer(index, option.text)}
                labelStyle={styles.radioLabel}
              />
              <Divider></Divider>
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
        {questionnaire.Questions.map(renderQuestion)}
        <Button mode="contained" onPress={handleSubmit} style={styles.submitButton}>
          Submit
        </Button>
      </View>
    </ScrollView>
  );
};



export default Questionnaire;
