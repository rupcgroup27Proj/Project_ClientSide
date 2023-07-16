import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, Linking, Dimensions } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { Card, Divider, IconButton, List } from "react-native-paper";
import axios from 'axios';
import { useUser } from '../../../Components/Contexts/UserContext';
import { useAPI } from '../../../Components/Contexts/APIContext';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import { useFocusEffect } from '@react-navigation/native';

export default function Tasks({ submission, navigation }) {
  const { currentUser } = useUser();
  const { simulatorAPI } = useAPI();

  const [tasks, setTasks] = useState([]);
  const [tasksNames, setTasksNames] = useState([]);
  const [details, setDetails] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [expandedDue, setExpandedDue] = React.useState(false);

  const handlePressDue = () => setExpandedDue(!expandedDue);


  useEffect(() => {
    getAllTasks();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getAllTasks();
      setDetails(null)
      setSubmissions('')
    }, [])
  );

  const getAllTasks = async () => {
    await axios
      .get(`${simulatorAPI}/api/Tasks/groupId/${currentUser.groupId}`)
      .then((res) => {
        setTasks(res.data);
        const taskNames = res.data.map(task => task.name);
        setTasksNames(taskNames);
      })
      .catch((err) => console.log("getAllTasks " + err));
  };

  function handleSelectChange(value) {
    const selectedTask = tasks.find(task => task.name === value);
    setDetails(selectedTask);
    getSubmissions(selectedTask.taskId);
    setExpandedDue(prev => !prev)
  };

  const getSubmissions = (taskId) => {
    axios
      .get(`${simulatorAPI}/api/Submissions/taskId/${taskId}`)
      .then((res) => {
        setSubmissions(res.data);
      })
      .catch((err) => console.log("getSubmissions " + err));
  };

  const handleDownload = async (u) => {
    Linking.openURL(`${simulatorAPI}/Images/${u}`);
  }


  return (
    <ScrollView style={{ backgroundColor: "white", height: Dimensions.get('window').height, paddingHorizontal: 20 }} >

      <List.Accordion
        title="All Tasks"
        left={props => <List.Icon {...props} icon="clipboard-text-clock" />}
        expanded={expandedDue}
        onPress={handlePressDue}>
        {tasksNames.map((d, index) => (
          <>
            <Divider></Divider>
            <List.Item key={index} title={d}
              onPress={() => { handleSelectChange(d) }}
            />
          </>
        ))}
      </List.Accordion>

      {details &&
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Card mode='elevated' style={{ margin: 10, flex: 4, backgroundColor: 'white' }}>
            <Card.Title title={details.name} titleStyle={{ fontSize: 18, color: 'white', fontWeight: 'bold' }} style={{ backgroundColor: '#2196F3' }} />
            <Card.Content>
              <Text variant="titleLarge">{details.description}</Text>
              <Text variant="bodyMedium">Due to: {new Date(details.due).toLocaleDateString("en-GB")}</Text>
            </Card.Content>
          </Card>
          <View style={{ marginVertical: 10, alignItems: 'center' }}>
            <Text style={{ fontSize: 16 }}>Task file:</Text>
            <IconButton icon="file-pdf-box" style={{ flex: 1 }} iconColor={'#2196F3'} size={60} mode={'contained'} containerColor={'rgba(255, 255, 255, 0.9)'} onPress={() => { handleDownload(details.fileURL) }} />
          </View>
        </View>
      }
      <Divider bold={true}></Divider>
      <Text style={{ marginTop: 15, fontWeight: "bold", fontSize: 18, color: '#2196F3' }}>Submissions: </Text>
      {submissions != '' ? (submissions.map((submission, index) => (
        <Card key={index} style={{ backgroundColor: submission.grade == 999 ? '#F5F5F5' : '#2196F3', margin: 0.5, paddingHorizontal: 10 }}>
          <Text onPress={() => navigation.navigate("SpecificTask", { submission: submission })} style={{ fontSize: 16 }} >
            {`${submission.firstName} ${submission.lastName}`}</Text>
        </Card>
      ))) : <></>}

    </ScrollView>
  )
};


