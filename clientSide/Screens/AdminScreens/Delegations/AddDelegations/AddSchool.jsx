import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Styles } from "./Styles";
import {  Divider ,Text } from 'react-native-paper';
import axios from "axios";

export default function AddSchool({ numGroup, navigation }) {
  const [schoolName, setSchoolName] = useState("");
  const [groupId, setGroupId] = useState("");

  const handleInputChange = (text) => {
    setSchoolName(text);
  };

  function sendScholl() {
    axios
      .post(`http://10.0.2.2:5283/api/Journeys/schoolName/${schoolName}`)
      .then((res) => {
        console.log("sendScholl ", res);
      })
      .catch((err) => {
        console.log("sendScholl " + err);
      });

    getGroupId();
  }

  function getGroupId() {
    axios
      .get(`http://10.0.2.2:5283/api/Journeys/schoolName/${schoolName}`)
      .then((res) => {
        setGroupId(res.data);
        alert("The group number is " + res.data.groupId + "!");
        navigation.navigate("AddTeacher", { numGroup: res.data.groupId });
      })
      .catch((err) => console.log("getGroupId " + err));
  }

  return (
    <View style={{ backgroundColor: '#33383E', marginTop: 40, height: '100%', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20, color: 'white' , alignSelf:'center'}}>
        Add New Delegation
      </Text>
      <Divider></Divider>
      <Text style={Styles.userTitle}>School Details</Text>
      <TextInput
        value={schoolName}
        onChangeText={handleInputChange}
        placeholder="School Name"
        placeholderTextColor={'grey'}
        cursorColor={'grey'}
        style={Styles.input}
      />
      <TouchableOpacity onPress={sendScholl} style={Styles.button}>
        <Text style={Styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
}
