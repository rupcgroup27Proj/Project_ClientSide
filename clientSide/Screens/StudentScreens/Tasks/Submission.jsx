import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Linking } from 'react-native';
import { Card, Divider, IconButton, Button } from "react-native-paper";
import * as DocumentPicker from 'expo-document-picker';
import { useUser } from '../../../Components/Contexts/UserContext';
import { useAPI } from '../../../Components/Contexts/APIContext';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


export default function Submission({ route }) {
  const { currentUser } = useUser();
  const { simulatorAPI } = useAPI();
  const { d, isRefresh, mySub } = route.params;
  const [det, setDet] = useState([]);
  const [pickedDocument, setPickedDocument] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios.get(`${simulatorAPI}/api/Submissions/taskId/${d.taskId}`)
      .then((res) => {
        setDet(res.data.filter(sub => sub.id = currentUser.id));
      })
      .catch((err) => console.log("getTask ", err));
  };

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

  const AddSubmission = async () => {

    const formData = new FormData();
    formData.append('id', currentUser.personalId);
    formData.append('document', pickedDocument);
    formData.append('taskId', d.taskId);
    formData.append('description', "A");
    formData.append('submittedAt', new Date().toLocaleDateString());

    try {
      await axios.post(`${simulatorAPI}/api/Submissions`, formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
      setPickedDocument(null)
      Alert.alert("Success", "File has been submitted successfully.")
      navigation.navigate("Student Tasks");
    } catch (error) {
      console.log('Error:', error);
    }
  }

  const RemoveSubmission = async () => {
    Alert.alert("Wait!", "Are you sure you want to delete this file?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {

        text: "OK",
        onPress: () => {
          axios.delete(`${simulatorAPI}/api/Submissions/submissionId/${det[0].submissionId}`)
            .then((res) => {
              getData();
              console.log("removeFileFromTask " + res);
            })

            .catch((err) => {
              console.log("removeFileFromTask " + err);
            });
        },
      },
    ]);
  }

  
  const handleDownload = async (u) => {
    Linking.openURL(`${simulatorAPI}/Images/${u}`);
  }

  const handleMySub = async (ms) => {
    await axios.get(`${simulatorAPI}/api/Submissions/studentId/${currentUser.id}/taskId/${ms}`)
      .then((res) => {
        Linking.openURL(`${simulatorAPI}/Images/${res.data}`);
      })
      .catch((err) => console.log("getTask ", err));
  }


  return (

    <ScrollView>
      {!isRefresh ? (
        <>
          <Text style={{ marginHorizontal: 10, color: '#2196F3', fontWeight: 'bold' }} onPress={() => navigation.navigate('Student Tasks')}>{`<back`}</Text>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Card mode='elevated' style={{ margin: 10, flex: 4, backgroundColor: 'white' }}>
              <Card.Title title={d.name} titleStyle={{ fontSize: 18, color: 'white', fontWeight: 'bold' }} style={{ backgroundColor: '#2196F3' }} />
              <Card.Content>
                <Text variant="titleLarge">{d.description}</Text>
                <Text variant="bodyMedium">Due to: {new Date(d.due).toLocaleDateString("en-GB")}</Text>
              </Card.Content>
            </Card>
            <View style={{ marginVertical: 10, alignItems: 'center' }}>
              <Text style={{ fontSize: 16 }}>Task file:</Text>
              <IconButton icon="file-pdf-box" style={{ flex: 1 }} iconColor={'#2196F3'} size={60} mode={'contained'} containerColor={'rgba(255, 255, 255, 0.9)'} onPress={() => { handleDownload(d.fileURL) }} />
            </View>
          </View>

          <Divider bold={true}></Divider>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 15 }}>
            <Button icon={'file-pdf-box'} disabled={pickedDocument} mode='contained' onPress={() => { pickDocument() }} style={{flex:3,margin:1}}>Upload submission file</Button>
            <Button icon={'upload'} disabled={!pickedDocument} mode='contained' onPress={() => { AddSubmission() }} style={{flex:2}}>Submit file</Button>
          </View>
          {pickedDocument ? (<Text style={{ textAlign: 'center', fontSize: 20, color: '#2196F3' }}>File chosen: {pickedDocument.name}</Text>) : (<Text></Text>)}
        </>
      ) : (
        <>
          <Text style={{ marginHorizontal: 10, color: '#2196F3', fontWeight: 'bold' }} onPress={() => navigation.navigate('Student Tasks')}>{`<back`}</Text>
          <View style={{ margin: 20, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, color: '#2196F3', fontWeight: 'bold' }}>Your submission:</Text>
            <IconButton icon="file-pdf-box" style={{ flex: 1 }} iconColor={'#2196F3'} size={50} mode={'contained'} containerColor={'rgba(255, 255, 255, 0.9)'} onPress={() => { handleMySub(mySub) }} />
          </View>
        </>

      )}



      {/* <View style={{ backgroundColor: "white", height: "100%", paddingHorizontal: 10, paddingTop: 40 }} >
        {det[0] == [] ? (<>
          {det.map((d) => (
            <View style={{ borderWidth: 2, borderColor: 'gray', padding: 10 }}>
              <Text style={{ fontSize: 25, fontWeight: "bold", marginBottom: 10, color: "black" }}>Task: {d.name}</Text>
              <Text style={{ fontSize: 18, marginBottom: 5 }}>Description: {d.description}</Text>
              <Text style={{ fontSize: 18, marginBottom: 5 }}>Upload Date: {d.createdAt}</Text>
              <Text style={{ fontSize: 18, marginBottom: 5 }}>Due Date: {d.due}</Text>
              <Text style={{ fontSize: 18, marginBottom: 5 }}>File: {d.fileURL}</Text>
            </View>
          ))}


          <View style={{ borderWidth: 2, borderColor: 'gray', padding: 10, marginTop: 25 }}>
            <Text style={{ fontSize: 18, marginBottom: 5 }}>submittedAt: {det[0].submittedAt}</Text>
            <View>
              {det[0].grade === 0 ? (
                <Text style={{ fontSize: 18, marginBottom: 5, fontSize: 17 }}>Grade: No grade yet </Text>
              ) : (
                <Text style={{ fontSize: 18, marginBottom: 5, fontWeight: "bold", fontSize: 17 }}>Grade: {det[0].grade} </Text>
              )}
            </View>

          </View>

          <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" }}>

            <Button title='Remove Submission' onPress={() => { RemoveSubmission() }} />
          </View>
        </>) :
          (<>

            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 18, marginTop: 10 }}>Upload your solution:</Text>
              {pickedDocument ? (
                <Text>{pickedDocument.name}</Text>
              ) : (
                <IconButton icon="upload" size={40} onPress={pickDocument} ></IconButton>
              )}
            </View>
            <Button title='Add Submission' onPress={() => { AddSubmission() }} />
          </>)}
      </View> */}

    </ScrollView>
  )
};

