import React , { useState ,useEffect } from 'react';
import { View ,Text } from 'react-native';
import { useUser } from '../../../Components/Contexts/UserContext';
import { useAPI } from '../../../Components/Contexts/APIContext';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';


export default function Tasks ({d , navigation}) {
  const { currentUser } = useUser();
  const { simulatorAPI } = useAPI();

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getAllTasks();
  }, []);

  const getAllTasks = async () => {
    await axios
      .get(`${simulatorAPI}/api/Tasks/groupId/${currentUser.groupId}`)
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => console.log("getAllTasks " + err));
  };


  return (
    <ScrollView style={{ backgroundColor: "white", height: "100%", paddingHorizontal: 20, paddingTop: 40, }} >
    <Text style={{fontSize: 24,fontWeight: "bold", marginBottom: 20,color: "black", alignSelf: "center", }} >
     All Tasks
    </Text>

    {tasks.map((d) => (
        <View key={d.taskId} style={{ borderWidth: 2, borderColor: 'gray', padding: 10}}>
        <Text style={{fontSize: 25,fontWeight: "bold", marginBottom: 10,color: "black"}}
         onPress={() => navigation.navigate("Submission", { d : d})}>Task: {d.name}</Text>
          <Text style={{fontSize: 18, marginBottom: 5}}>Description: {d.description}</Text>
          <Text style={{fontSize: 18, marginBottom: 5}}>Upload Date: {d.createdAt}</Text>
          <Text style={{fontSize: 18, marginBottom: 5}}>Due Date: {d.due}</Text>
          <Text style={{fontSize: 18, marginBottom: 5}}>File: {d.fileURL}</Text>
        </View> 
    ))}
    </ScrollView>
  )
};

