import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Styles } from "./Styles";
import { SelectList } from "react-native-dropdown-select-list";
import axios from "axios";
import { useAPI } from "../../../../Components/Contexts/APIContext";

export default function AddTeacher({ numGroup2, route, navigation }) {
  const { numGroup } = route.params;
  const { simulatorAPI } = useAPI();
  const [formDataTeacher, setFormDataTeacher] = useState({
    password: "",
    teacherId: 0,
    firstName: "",
    lastName: "",
    phone: 0,
    email: "",
    pictureUrl: "",
    groupId: numGroup,
    startDate: "2023-04-03T11:51:06.983Z",
    endDate: "2023-04-03T11:51:06.983Z",
    type: "",
  });

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [teacherIdError, setTeacherIdError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const data = [
    { key: "1", value: "Student" },
    { key: "2", value: "Teacher" },
    { key: "3", value: "Guide" },
  ];

  const validateFirstName = (firstName) => {
    if (!/^[a-zA-Z]+$/.test(firstName)) {
      setFirstNameError("First name should only contain letters");
    } else {
      setFirstNameError("");
    }
  };

  const validateLastName = (lastName) => {
    if (!/^[a-zA-Z]+$/.test(lastName)) {
      setLastNameError("Last name should only contain letters");
    } else {
      setLastNameError("");
    }
  };

  const validateTeacherId = (teacherId) => {
    const idRegex = /^\d{9}$/;
    if (!teacherId.match(idRegex)) {
      setTeacherIdError("ID should contain exactly 9 numbers.");
    } else {
      setTeacherIdError("");
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailRegex)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    if (!phone.match(phoneRegex)) {
      setPhoneError("Phone number should contain exactly 10 numbers.");
    } else {
      setPhoneError("");
    }
  };

  const handleInputChange = (field, value) => {
    setFormDataTeacher({ ...formDataTeacher, [field]: value });
    switch (field) {
      case "firstName":
        validateFirstName(value);
        break;
      case "lastName":
        validateLastName(value);
        break;
      case "teacherId":
        validateTeacherId(value);
        break;
      case "email":
        validateEmail(value);
        break;
      case "phone":
        validatePhone(value);
        break;
      default:
        break;
    }
  };

  function handleSubmitTeacher() {
    // Check if all fields are filled
    if (
      !formDataTeacher.firstName ||
      !formDataTeacher.lastName ||
      !formDataTeacher.teacherId ||
      !formDataTeacher.email ||
      !formDataTeacher.phone
    ) {
      console.log("Please fill in all the fields.");
      return;
    }

    // Check if all fields are valid
    if (
      firstNameError ||
      lastNameError ||
      teacherIdError ||
      emailError ||
      phoneError
    ) {
      console.log("Please correct the errors in the form.");
      return;
    }

    axios
      .post(`${simulatorAPI}/api/Teachers`, formDataTeacher)
      .then((res) => {
        console.log("SCC in formDataTeacher ", res);
        navigation.navigate("AddGuide", { numGroup2: formDataTeacher.groupId });
      })
      .catch((error) => console.log("ERR in formDataTeacher", error));
  }

  return (
    <ScrollView style={Styles.container}>
      <Text style={Styles.title}>Add New Delegation</Text>
      <Text style={Styles.userTitle}>Teacher Details</Text>
      <TextInput
        value={formDataTeacher.firstName}
        onChangeText={(value) => handleInputChange("firstName", value)}
        placeholder="First Name"
        style={Styles.input}
      />
      {firstNameError ? (
        <Text style={Styles.error}>{firstNameError}</Text>
      ) : null}
      <TextInput
        value={formDataTeacher.lastName}
        onChangeText={(value) => handleInputChange("lastName", value)}
        placeholder="Last Name"
        style={Styles.input}
      />
      {lastNameError ? <Text style={Styles.error}>{lastNameError}</Text> : null}
      <TextInput
        value={formDataTeacher.teacherId}
        onChangeText={(value) => handleInputChange("teacherId", value)}
        placeholder="Id"
        style={Styles.input}
      />
      {teacherIdError ? (
        <Text style={Styles.error}>{teacherIdError}</Text>
      ) : null}
      <TextInput
        value={formDataTeacher.email}
        onChangeText={(value) => handleInputChange("email", value)}
        placeholder="Email"
        style={Styles.input}
      />
      {emailError ? <Text style={Styles.error}>{emailError}</Text> : null}
      <TextInput
        value={formDataTeacher.phone}
        onChangeText={(value) => handleInputChange("phone", value)}
        placeholder="Phone Number"
        style={Styles.input}
      />
      {phoneError ? <Text style={Styles.error}>{phoneError}</Text> : null}
      <SelectList
        search={false}
        setSelected={(value) => handleInputChange("type", value)}
        data={data}
        save="value"
      />
      <TouchableOpacity onPress={handleSubmitTeacher} style={Styles.button}>
        <Text style={Styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
