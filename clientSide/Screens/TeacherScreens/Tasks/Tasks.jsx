import React, { useState , useEffect} from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { Card } from "react-native-paper";
import axios from 'axios';
import { useUser } from '../../../Components/Contexts/UserContext';
import { useAPI } from '../../../Components/Contexts/APIContext';



export default function Tasks ({submission , navigation}) {
  const { currentUser } = useUser();
  const { simulatorAPI } = useAPI();

  const [tasks, setTasks] = useState([]);
  const [tasksNames, setTasksNames] = useState([]);
  const [details, setDetails] = useState(null);
  const [submissions, setSubmissions] = useState([]);


  useEffect(() => {
    getAllTasks();
  }, []);

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

  function handleSelectChange (value) {
    const selectedTask = tasks.find(task => task.name === value);
    setDetails(selectedTask);

    getSubmissions(selectedTask.taskId);
  };

  const getSubmissions = (taskId) => {
    axios
    .get(`${simulatorAPI}/api/Submissions/taskId/${taskId}`)
    .then((res) => {
      setSubmissions(res.data);
    })
    .catch((err) => console.log("getSubmissions " + err));
  };



  return(
    <ScrollView style={{ backgroundColor: "white", height: "100%", paddingHorizontal: 20, paddingTop: 40, }} >
    <Text style={{fontSize: 24,fontWeight: "bold", marginBottom: 20,color: "black", alignSelf: "center", }} >
     All Tasks
    </Text>

    <View style={{marginBottom: 20}} >
    <SelectList
          search={false}
          setSelected={(value) => handleSelectChange(value)}
          data={tasksNames}
          save="value"
          dropdownTextStyles={{ color: 'black' }}
        />
    </View>

    {details && (
        <View style={{ borderWidth: 1, borderColor: 'gray', padding: 10}}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10}}>{details.name}</Text>        
          <Text style={{ marginBottom: 5}}>Description: {details.description}</Text>
          <Text style={{ marginBottom: 5}}>Due Date: {details.due}</Text>
          <Text style={{ marginBottom: 5}}>File Url: {details.fileURL}</Text>
        </View>     
      )}

   
      <Text style={{ marginTop: 15 ,fontWeight: "bold" , fontSize: 18}}>Submissions: </Text>
      {submissions.map((submission) => (
      <Card key={submission.id} style={{ backgroundColor: "pink"}}>
      <Text onPress={() => navigation.navigate("SpecificTask", { submission : submission})} >
      {`${submission.firstName} ${submission.lastName}`}</Text>
      </Card>
       ))}

    </ScrollView>
  )
};


