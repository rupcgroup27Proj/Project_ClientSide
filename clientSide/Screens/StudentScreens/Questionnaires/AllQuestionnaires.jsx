import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';
//import { createStackNavigator } from '@react-navigation/stack';

//const Stack = createStackNavigator();

const AllQuestionnaires = ({ navigation }) => {
  const [questionnaireTitles, setQuestionnaireTitles] = useState([
    { id: 1, title: 'Questionnaire 1' },
    { id: 2, title: 'Questionnaire 2' },
    { id: 3, title: 'Questionnaire 3' },
    { id: 4, title: 'Questionnaire 4' },
  ]);


  const handlePress = (id) => {
    navigation.navigate('Questionnaire', { id });
  };

  return (
    <View >
      <List.Section>
        <List.Subheader>Questionnaires</List.Subheader>
        {questionnaireTitles.map((questionnaire) => (
          <TouchableOpacity key={questionnaire.id} onPress={() => handlePress(questionnaire.id)}>
            <List.Item title={questionnaire.title} />
          </TouchableOpacity>
        ))}
      </List.Section>
    </View>
  );
};

export default AllQuestionnaires;