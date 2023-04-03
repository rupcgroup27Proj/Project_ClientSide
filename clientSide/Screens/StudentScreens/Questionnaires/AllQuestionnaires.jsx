import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Divider, List } from 'react-native-paper';
import axios from 'axios';
import { useUser } from '../../../Components/Contexts/UserContext';


const AllQuestionnaires = ({ navigation }) => {
  const { currentUser } = useUser();
  const [questionnaires, setQuestionnaires] = useState([]);

  useEffect(() => {
    const getAllQuestionnaires = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:5283/api/Questionnaires/groupId/${currentUser.groupId}`);
        setQuestionnaires(response.data);
      } catch (error) { console.log(error); }
    }
    getAllQuestionnaires()
  }, [])


  const handlePress = (questionnaire) => {
    navigation.navigate('Questionnaire', { questionnaire });
  };


  return (
    <View >
      <List.Section>
        <List.Subheader>All questionnaires</List.Subheader>
        {questionnaires.map((questionnaire) => (
          <TouchableOpacity key={questionnaire.Id} onPress={() => handlePress(questionnaire)}>
            <List.Item
              key={questionnaire.Id}
              title={questionnaire.Title}
              titleNumberOfLines={2}
              description={questionnaire.Description}
              left={(item) => <List.Icon {...item} icon="file-question-outline" />} />
            <Divider/>
          </TouchableOpacity>

        ))}
      </List.Section>
    </View>
  );
};

export default AllQuestionnaires;