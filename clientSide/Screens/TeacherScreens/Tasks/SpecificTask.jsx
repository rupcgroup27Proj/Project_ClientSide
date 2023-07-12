import React , { useState ,useEffect } from 'react';
import { View ,Text , Button, TextInput, Alert} from 'react-native';
import { useAPI } from '../../../Components/Contexts/APIContext';
import axios from 'axios';


export default function SpecificTask({ route }) {
  const { simulatorAPI } = useAPI();
  const {submission} = route.params;

  const [det, setDet] = useState([]);
  const [grade, setGrade] = useState(""); 


  useEffect(() => {
        getTask();
  }, []);
    

  const getTask = async () => {
        await axios
        .get(`${simulatorAPI}/api/Tasks/taskId/${submission.taskId}`)
        .then((res) => {
          setDet(res.data);
         })
        .catch((err) => console.log("getTask ", err));
  };

   
  function UpdateGrade()  {

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

     axios
      .put(`${simulatorAPI}/api/Submissions/submissionId/${submission.submissionId}`, Submission)
      .then((res) => {
          Alert.alert("Success", "The Grade Updated successfully!", [
            {
              text: "OK",
              onPress: () => navigation.goBack()
            },
          ]);    
      })
      .catch((err) =>  Alert.alert("Error", "Update Grade was failed."));

      
  };



  return (
    <View style={{ backgroundColor: "white", height: "100%", paddingHorizontal: 10, paddingTop: 40}} >
     
    <View>
       <Text style={{ marginBottom: 15 ,fontWeight: "bold", fontSize: 20,backgroundColor: "pink"}}>Student Name: {`${submission.firstName} ${submission.lastName}`}</Text>
    </View>
  
    {det.map((d) => (
        <View key={d.taskId} style={{ borderWidth: 2, borderColor: 'gray', padding: 10}}>
        <Text style={{fontSize: 25,fontWeight: "bold", marginBottom: 10,color: "black"}}>Task: {d.name}</Text>
          <Text style={{fontSize: 18, marginBottom: 5}}>Description: {d.description}</Text>
          <Text style={{fontSize: 18, marginBottom: 5}}>Upload Date: {d.createdAt}</Text>
          <Text style={{fontSize: 18, marginBottom: 5}}>Due Date: {d.due}</Text>
          <Text style={{fontSize: 18, marginBottom: 5}}>File: {d.fileURL}</Text>
        </View> 
    ))}


    <View style={{ borderWidth: 2, borderColor: 'gray', padding: 10 , marginTop:25}}>

    <Text style={{fontSize: 18, marginBottom: 5}}>File: {submission.fileURL}</Text>
    <Text style={{fontSize: 18,marginBottom: 5,backgroundColor: submission.submittedAt > det[0]?.due ? 'red' : 'green',}}>
      submittedAt: {submission.submittedAt}</Text>

    {submission.grade === 0 ? (
    <View style={{ flexDirection: "row"}}>
      <Text style={{ fontSize: 17}}>Grade: </Text>
      <TextInput
          value={grade}
          onChangeText={(value) => setGrade(value)}
          placeholder="Enter grade..."
          style={{backgroundColor:"pink"}}
        />
      </View>
    ):(
      <View>
      <Text style={{ fontSize: 17}}>Grade: {submission.grade}</Text> 
      </View>
    )}   

    </View>
       

   <View style={{marginTop:25 ,paddingHorizontal: 40}}>
         <Button title='Update Grade' onPress={UpdateGrade}/>     
   </View>
   
  </View>
  )};
