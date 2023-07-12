import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Button, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Styles } from "./Styles";
import * as DocumentPicker from 'expo-document-picker';
import { useUser } from '../../../Components/Contexts/UserContext';
import { useAPI } from '../../../Components/Contexts/APIContext';


export default function NewTask () {
  const { currentUser } = useUser();
  const { simulatorAPI } = useAPI();

  const [name, setName] = useState(""); 
  const [description, setDescription] = useState(""); 
  const [date, setDate] = useState(new Date()); 
  const [mode, setMode] = useState("date"); 
  const [showDate, setShowDate] = useState(false); 
  const [text, setText] = useState(""); 
  const [pickedDocument, setPickedDocument] = useState(null);


  const handleEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(false);
    setDate(currentDate);


   let temp= new Date(currentDate);
   let fDate= temp.getDate() + "/" + (temp.getMonth() +1) + "/" + temp.getFullYear();
   setText(fDate);

  }

  const showMode = (currentMode) => {
  setShowDate(true);
  setMode(currentMode);
  }


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



  function handleSubmit()  {
    if (!text){
      Alert.alert("Validation Error", "Please select date.");
      return;
    }
    else if (!name){
      Alert.alert("Validation Error", "Please add task name.");
      return;
    }
    else if (!description){
      Alert.alert("Validation Error", "Please add description.");
      return;
    }

    const Task = {
      groupId: currentUser.groupId,                
      name: name,
      description: description,
      createdAt:"2023-04-10T20:37:23.145Z",
      fileURL: pickedDocument.uri,
      due: date
    };
     console.log(pickedDocument);

    fetch(`${simulatorAPI}/api/Tasks`, {
      method: "POST",
      body: JSON.stringify(Task),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        if (res.ok) {
          Alert.alert("Success", "The task was added successfully!", [
            {
              text: "OK",
            },
          ]);
        } else {
          Alert.alert("Error", "task was failed.");
        }
      })
      .then(
        (res) => {
          console.log("suc in post task to DB", res);
        },
        (error) => {
          console.log("ERR in post task to DB", error);
        }
      );
    
      setName("");
      setDescription("");
      setPickedDocument("");
      setText("");
   };


  return (
    <ScrollView style={{ backgroundColor: "gray", height: "100%", paddingHorizontal: 20, paddingTop: 40 }} >
    <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "white", alignSelf: "center", }} >
      New Assignment
    </Text>

    <View>
        <Text style={{color: "white"}}>Assignment Name</Text>
        <TextInput
          value={name}
          onChangeText={(value) => setName(value)}
          placeholder="Enter assignment name"
          style={Styles.input}
        />

       <Text style={{color: "white"}}>Description</Text>
        <TextInput
          value={description}
          onChangeText={(value) => setDescription(value)}
          placeholder="Enter description"
          style={Styles.input}
          multiline={true}
          numberOfLines={4}
        />


      <Text style={{color: "white"}}>Due Date {text}</Text>
      <Button title='Date Picker' onPress={() => {showMode("date")}}/>
      {showDate && (
          <DateTimePicker
            testID='DateTimePicker'
            minimumDate={new Date()}
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={handleEndDateChange}
          />        
        )}
       </View>    

       <View>
      <Text style={{ color: 'white' }}>Upload File</Text>
      <Button title="Pick Document" onPress={pickDocument} />
      {pickedDocument && (
        <Text style={{color: "white"}}>
          Picked Document: {pickedDocument.name} 
        </Text>
        
      )}
      </View>
    
      <View style={{marginHorizontal:60}}>
      <Text style={{color: "white"}}>done</Text>
      <Button title='DONE' onPress={handleSubmit}/>
      </View>
  
  </ScrollView>

  )}
