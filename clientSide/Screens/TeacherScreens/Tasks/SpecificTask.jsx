import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, Alert, Linking, Dimensions } from 'react-native';
import { useAPI } from '../../../Components/Contexts/APIContext';
import axios from 'axios';
import { Divider, Button, IconButton } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';


export default function SpecificTask({ route }) {
  const { simulatorAPI } = useAPI();
  const { submission } = route.params;
  const navigation = useNavigation();
  const [det, setDet] = useState([]);
  const [grade, setGrade] = useState("");


  useEffect(() => {
    getTask();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getTask();
    }, [])
  );
  const getTask = async () => {
    await axios
      .get(`${simulatorAPI}/api/Tasks/taskId/${submission.taskId}`)
      .then((res) => {
        setDet(res.data);
      })
      .catch((err) => console.log("getTask ", err));
  };


  function UpdateGrade() {
    if (grade > 100 || grade < 0) {
      Alert.alert('Failure', 'Grade must be between 0-100');
      return;
    }
    const Submission = {
      id: submission.id,
      firstName: submission.firstName,
      lastName: submission.lastName,
      fileURL: submission.fileURL,
      description: submission.description,
      submittedAt: submission.submittedAt,
      grade: grade,
      taskId: submission.taskId,
      submissionId: submission.submissionId
    };

    axios.put(`${simulatorAPI}/api/Submissions/submissionId/${submission.submissionId}`, Submission)
      .then((res) => {
        Alert.alert("Success", "Grade updated successfully!", [
          {
            text: "OK",
            onPress: () => navigation.navigate("Teacher Tasks")
          },
        ]);
      })
      .catch((err) => Alert.alert("Error", "Update Grade was failed."));


  };



  return (
    <View style={{ height: Dimensions.get('window').height, paddingHorizontal: 20 }} >
      <Text style={{color: '#2196F3', fontWeight: 'bold' }} onPress={() => navigation.navigate('Teacher Tasks')}>{`<back`}</Text>
      <View>
        <Text style={{ marginBottom: 10, fontWeight: "bold", fontSize: 20, color: '#2196F3', textAlign: 'center', marginTop: 5 }}>Student Name: {`${submission.firstName} ${submission.lastName}`}</Text>
      </View>

      <Divider></Divider>



      <View style={{ margin: 20, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
        <Text style={{ fontSize: 24, color: '#2196F3' }}>Submission file:</Text>
        <IconButton icon="file-pdf-box" style={{}} iconColor={'#2196F3'} size={50} mode={'contained'} containerColor={'rgba(255, 255, 255, 0.9)'} onPress={() => { Linking.openURL(`${simulatorAPI}/Images/${submission.fileURL}`); }} />
      </View>

      <Text style={{ fontSize: 18, marginBottom: 5, backgroundColor: submission.submittedAt > det[0]?.due ? 'red' : '#2196F3', }}>
        Submitted at: {new Date(submission.submittedAt).toLocaleDateString()}</Text>

      {submission.grade === 999 ? (
        <>
          <View style={{ flexDirection: "row", justifyContent: 'space-around' }}>
            <Text style={{ fontSize: 20 }}>Grade: </Text>
            <TextInput
              value={grade}
              onChangeText={(value) => setGrade(value)}
              placeholder="Enter grade..."
              style={{ backgroundColor: "white" }}
            />
          </View>
        </>

      ) : (
        <>
          <View>
            <Text style={{ fontSize: 20, textAlign: 'center' }}>Grade: {submission.grade}</Text>
          </View>

          <TextInput
            value={grade}
            onChangeText={(value) => setGrade(value)}
            placeholder="Update grade..."
            style={{ backgroundColor: "white" }}
          />

        </>
      )}

      <View style={{ marginTop: 25, paddingHorizontal: 40 }}>
        <Button disabled={grade == '' ? true : false} mode='contained' onPress={UpdateGrade}>Update Grade</Button>
      </View>

    </View>
  )
};
