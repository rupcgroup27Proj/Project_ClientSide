import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Styles } from "./Styles";
import * as DocumentPicker from 'expo-document-picker';
import { useUser } from '../../../Components/Contexts/UserContext';
import { useAPI } from '../../../Components/Contexts/APIContext';
import axios from 'axios';
import { TextInput, Button, Divider } from 'react-native-paper';

export default function NewTask() {
  const { currentUser } = useUser();
  const { simulatorAPI } = useAPI();

  const [name, setName] = useState("Presentation Task");
  const [description, setDescription] = useState("Final presentation");
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


  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({ type: "application/pdf", copyToCacheDirectory: true }).then(response => {
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
    console.log(formData)
    try {
      await axios.post(`${simulatorAPI}/api/Tasks`, formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) { console.log(error) }
    Alert.alert("Success", "Task has been uploaded successfully.");
    setName("");
    setDescription("");
    setPickedDocument("");
    setText("");
  };


  return (
    <ScrollView style={{ height: Dimensions.get('window').height, paddingHorizontal: 20 }} >

      <View style={{ marginTop: 10 }}>
        <Text style={{ fontSize: 16 }}>Assignment Name:</Text>
        <TextInput
          value={name}
          onChangeText={(value) => setName(value)}
          placeholder="Enter assignment name"
          style={{ backgroundColor: 'white' }}
        />

        <Text style={{ fontSize: 16 }}>Description:</Text>
        <TextInput
          value={description}
          onChangeText={(value) => setDescription(value)}
          placeholder="Enter description"
          style={{ backgroundColor: 'white' }}
          multiline={true}
          numberOfLines={4}
        />


        <Text style={{ fontSize: 16 }}>Due Date {text}</Text>
        <Button mode='elevated' onPress={() => { showMode("date") }}>Pick Date</Button>
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
        <Text style={{ fontSize: 16 }}>Upload File</Text>
        <Button mode='elevated' onPress={pickDocument}>Pick Document</Button>
        {pickedDocument && (
          <Text style={{ color: "white" }}>
            Picked Document: {pickedDocument.name}
          </Text>

        )}
      </View>

      <View style={{ marginHorizontal: 60, marginTop: 20 }}>
        <Button mode='contained' onPress={handleSubmit}>Upload</Button>
      </View>

    </ScrollView>

  )
}
