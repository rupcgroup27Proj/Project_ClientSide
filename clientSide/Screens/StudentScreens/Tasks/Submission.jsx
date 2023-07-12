import React , { useState ,useEffect } from 'react';
import { View ,Text , Button} from 'react-native';
import {Card, IconButton} from "react-native-paper";
import * as DocumentPicker from 'expo-document-picker';
import { useUser } from '../../../Components/Contexts/UserContext';
import { useAPI } from '../../../Components/Contexts/APIContext';
import axios from 'axios';


export default function Submission ({ route }) {
  const { currentUser } = useUser();
  const { simulatorAPI } = useAPI();
  const {d} = route.params;

  const [det, setDet] = useState([]);
  const [pickedDocument, setPickedDocument] = useState(null);

  useEffect(() => {
    getTask();
}, []);

const getTask = async () => {
    await axios
    .get(`${simulatorAPI}/api/Tasks/taskId/${d.taskId}`)
    .then((res) => {
      setDet(res.data);
     })
    .catch((err) => console.log("getTask ", err));
};

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf', // Specify the type of documents to pick (e.g., PDF, DOC, DOCX)
        copyToCacheDirectory: false, // Set it to true if you want to copy the picked document to the app's cache directory
      });

      if (result.type === 'success') {
        setPickedDocument(result);
      }
    } catch (error) {
      console.log('Error picking document:', error);
    }
};

function AddSubmission() {
  axios
      .post(`${simulatorAPI}/api/Submissions/submissionId/${submission.submissionId}`)
      .then((res) => {console.log(res);
      })
      .catch((err) => console.log("getSpecificTask " , err));
}

const RemoveSubmission= async () => {
    Alert.alert("Wait!", "Are you sure you want to delete this file?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          axios
            .delete(`${simulatorAPI}/api/Submissions/submissionId/${submission.submissionId}`)
            .then((res) => {
              getTask();
              console.log("removeFileFromTask " + res);
            })

            .catch((err) => {
              console.log("removeFileFromTask " + err);
            });
        },
      },
    ]);
}

  return (
    <View style={{ backgroundColor: "white", height: "100%", paddingHorizontal: 10, paddingTop: 40}} >

   {det.map((d) => (
       <View style={{ borderWidth: 2, borderColor: 'gray', padding: 10}}>
       <Text style={{fontSize: 25,fontWeight: "bold", marginBottom: 10,color: "black"}}>Task: {d.name}</Text>
         <Text style={{fontSize: 18, marginBottom: 5}}>Description: {d.description}</Text>
         <Text style={{fontSize: 18, marginBottom: 5}}>Upload Date: {d.createdAt}</Text>
         <Text style={{fontSize: 18, marginBottom: 5}}>Due Date: {d.due}</Text>
         <Text style={{fontSize: 18, marginBottom: 5}}>File: {d.fileURL}</Text>
       </View> 
   ))}


   <View style={{ borderWidth: 2, borderColor: 'gray', padding: 10 , marginTop:25}}>
   
   <View style={{ flexDirection: "row"}}>
   <Text style={{fontSize: 18, marginTop: 10}}>File: </Text>
   {pickedDocument ? (
    <Text>{pickedDocument.name}</Text>
   ):(
    <IconButton icon="upload" size={20} onPress={pickDocument} ></IconButton>
   )}
   </View>



   <Text style={{fontSize: 18, marginBottom: 5}}>submittedAt: {submission.submittedAt}</Text>
   <View>
   {submission.grade === 0 ? (
     <Text style={{fontSize: 18, marginBottom: 5, fontSize: 17}}>Grade: No grade yet </Text>
   ):(
     <Text style={{fontSize: 18, marginBottom: 5,fontWeight: "bold", fontSize: 17}}>Grade: {submission.grade} </Text>
   )}
   </View>
  
   </View>
            
   <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around"}}>
   <Button title='Add Submission' onPress={() => {AddSubmission}}/>
   <Button title='Remove Submission' onPress={() => {RemoveSubmission}}/>
   </View>

 </View>
  )
};

