import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Styles } from "./Styles";
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
    <View style={Styles.container}>
      <Text style={Styles.title}>Add New Delegation</Text>
      <Text style={Styles.userTitle}>School Details</Text>
      <TextInput
        value={schoolName}
        onChangeText={handleInputChange}
        placeholder="School Name"
        style={Styles.input}
      />
      <TouchableOpacity onPress={sendScholl} style={Styles.button}>
        <Text style={Styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
}
