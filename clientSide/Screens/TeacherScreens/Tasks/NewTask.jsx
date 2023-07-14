import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Button, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Styles } from "./Styles";
import * as DocumentPicker from 'expo-document-picker';
import { useUser } from '../../../Components/Contexts/UserContext';
import { useAPI } from '../../../Components/Contexts/APIContext';
import axios from 'axios';


export default function NewTask() {
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


    let temp = new Date(currentDate);
    let fDate = temp.getDate() + "/" + (temp.getMonth() + 1) + "/" + temp.getFullYear();
    setText(fDate);

  }

  const showMode = (currentMode) => {
    setShowDate(true);
    setMode(currentMode);
  }


  // const pickDocument = async () => {
  //   try {
  //     const result = await DocumentPicker.getDocumentAsync({
  //       type: 'application/pdf', 
  //     });

  //     if (result.type === 'success') {
  //       setPickedDocument(result);
  //     }
  //   } catch (error) {
  //     console.log('Error picking document:', error);
  //   }
  // };


  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: true }).then(response => {
      if (response.type == 'success') {
        let { name, size, uri } = response;
        let nameParts = name.split('.');
        let fileType = nameParts[nameParts.length - 1];
        var fileToUpload = {
          name: name,
          size: size,
          uri: uri,
          type: "application/" + fileType
        };
        console.log(fileToUpload)
        setPickedDocument(fileToUpload)
      }
    }).then(console.log(pickedDocument))
  }




  const handleSubmit = async () => {
    if (!text) {
      Alert.alert("Validation Error", "Please select date.");
      return;
    }
    else if (!name) {
      Alert.alert("Validation Error", "Please add task name.");
      return;
    }
    else if (!description) {
      Alert.alert("Validation Error", "Please add description.");
      return;
    }

    const url = `${simulatorAPI}/api/Tasks`;
    const fileUri = pickedDocument.uri;
    const formData = new FormData();
    formData.append('groupId', currentUser.groupId);
    formData.append('document', pickedDocument);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('date', date.toLocaleDateString());
    const response = await axios.post(`${simulatorAPI}/api/Tasks`, formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response.data)

    setName("e");
    setDescription("e");
    setPickedDocument("");
    setText("");
  };


  return (
    <ScrollView style={{ backgroundColor: "gray", height: "100%", paddingHorizontal: 20, paddingTop: 40 }} >
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "white", alignSelf: "center", }} >
        New Assignment
      </Text>

      <View>
        <Text style={{ color: "white" }}>Assignment Name</Text>
        <TextInput
          value={name}
          onChangeText={(value) => setName(value)}
          placeholder="Enter assignment name"
          style={Styles.input}
        />

        <Text style={{ color: "white" }}>Description</Text>
        <TextInput
          value={description}
          onChangeText={(value) => setDescription(value)}
          placeholder="Enter description"
          style={Styles.input}
          multiline={true}
          numberOfLines={4}
        />


        <Text style={{ color: "white" }}>Due Date {text}</Text>
        <Button title='Date Picker' onPress={() => { showMode("date") }} />
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
          <Text style={{ color: "white" }}>
            Picked Document: {pickedDocument.name}
          </Text>

        )}
      </View>

      <View style={{ marginHorizontal: 60 }}>
        <Text style={{ color: "white" }}>done</Text>
        <Button title='DONE' onPress={handleSubmit} />
      </View>

    </ScrollView>

  )
}
