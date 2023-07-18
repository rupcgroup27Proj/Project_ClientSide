import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Styles } from "./Styles"
import { Button, Divider, useTheme } from 'react-native-paper';
import { useUser } from '../../../Components/Contexts/UserContext';
import { TextInput } from 'react-native-paper';
import axios from "axios";
import { useAPI } from '../../../Components/Contexts/APIContext';
import { useNavigation } from '@react-navigation/native';
import { useTeacher } from '../../../Components/Contexts/TeacherContext';
import { ScrollView } from 'react-native-gesture-handler';

const GuideFeedback = () => {

  const { endDate } = useTeacher();
  const navigation = useNavigation();
  const { simulatorAPI } = useAPI();
  const { currentUser } = useUser();
  const [fbText, setFbText] = useState('');
  const [allFeedbacks, setAllFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFB = async () => {
      try {
        const response = (await axios.get(`${simulatorAPI}/api/Feedback/groupId/${currentUser.groupId}`));
        setAllFeedbacks(response.data.map(item => item.feedbackText))
      }
      catch (error) { Alert.alert("Error", "Failed to fetch Feedbacks."); }
    };
    fetchFB();
  }, [])

  const Submit = async () => {
    const feedback = {
      guideId: 0,
      feedbackText: fbText,
      replierId: currentUser.id,
      groupId: currentUser.groupId
    }

    await axios.post(`${simulatorAPI}/api/Feedback`, feedback)
      .then((res) => {
        Alert.alert("Success", "Sent feedback successfully!");
        setFbText('');
        navigation.navigate('Home');
      })
      .catch((err) => {
        Alert.alert('Error', `Couldn't send your feedback.`)
        return;
      });
  };


  return (
    currentUser.type == "Student" ? (
      <View>
        <Text style={Styles.texts}>Anything you want to say to the Guide?</Text>
        <TextInput multiline numberOfLines={16} value={fbText} onChangeText={(text) => setFbText(text)} style={[Styles.box, { backgroundColor: 'white' }]}></TextInput>
        <Button onPress={Submit} mode="contained" style={Styles.subBut} disabled={fbText == ''} >Send Feedback</Button>
      </View>

    ) :
      (
        <ScrollView>
          <Text style={Styles.texts}>All feedbacks:</Text>
          <Divider></Divider>
          {allFeedbacks.map((str, index) => (
            <TextInput
              key={index}
              value={str}
              multiline
              style={Styles.textInput}
              editable={false}
              scrollEnabled={false}
            />
          ))}
        </ScrollView>
      )

  )
}

export default GuideFeedback