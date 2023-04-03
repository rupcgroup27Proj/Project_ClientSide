import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Styles } from "./Styles";
import { SelectList } from "react-native-dropdown-select-list";
import axios from "axios";

export default function AddGuide({ route, navigation }) {
  const { numGroup2 } = route.params;
  const [formDataGuide, setFormDataGuide] = useState({
    password: "",
    guideId: 0,
    firstName: "",
    lastName: "",
    phone: 0,
    email: "",
    pictureUrl: "",
    groupId: numGroup2,
    startDate: "2023-04-03T11:51:06.983Z",
    endDate: "2023-04-03T11:51:06.983Z",
    type: "",
  });

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [guideIdError, setGuideIdError] = useState("");
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

  const validateGuideId = (guideId) => {
    const idRegex = /^\d{9}$/;
    if (!guideId.match(idRegex)) {
      setGuideIdError("ID should contain exactly 9 numbers.");
    } else {
      setGuideIdError("");
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
    setFormDataGuide({ ...formDataGuide, [field]: value });
    switch (field) {
      case "firstName":
        validateFirstName(value);
        break;
      case "lastName":
        validateLastName(value);
        break;
      case "guideId":
        validateGuideId(value);
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

  function handleSubmitGuide() {
    console.log(handleSubmitGuide);
    // Check if all fields are filled
    if (
      !formDataGuide.firstName ||
      !formDataGuide.lastName ||
      !formDataGuide.guideId ||
      !formDataGuide.email ||
      !formDataGuide.phone
    ) {
      console.log("Please fill in all the fields.");
      return;
    }

    // Check if all fields are valid
    if (
      firstNameError ||
      lastNameError ||
      guideIdError ||
      emailError ||
      phoneError
    ) {
      console.log("Please correct the errors in the form.");
      return;
    }

    axios
      .post(`http://10.0.2.2:5283/api/Guides`, formDataGuide)
      .then((res) => {
        console.log("SCC in formDataGuide ", res);
        alert("The delegation created succcessfully!");
        navigation.navigate("AllDelegetions");
      })
      .catch((error) => console.log("ERR in formDataGuide", error));
  }

  return (
    <ScrollView style={Styles.container}>
      <Text style={Styles.title}>Add New Delegation</Text>
      <Text style={Styles.userTitle}>Guide Details</Text>
      <TextInput
        value={formDataGuide.firstName}
        onChangeText={(value) => handleInputChange("firstName", value)}
        placeholder="First Name"
        style={Styles.input}
      />
      {firstNameError ? (
        <Text style={Styles.error}>{firstNameError}</Text>
      ) : null}
      <TextInput
        value={formDataGuide.lastName}
        onChangeText={(value) => handleInputChange("lastName", value)}
        placeholder="Last Name"
        style={Styles.input}
      />
      {lastNameError ? <Text style={Styles.error}>{lastNameError}</Text> : null}
      <TextInput
        value={formDataGuide.guideId}
        onChangeText={(value) => handleInputChange("guideId", value)}
        placeholder="Id"
        style={Styles.input}
      />
      {guideIdError ? <Text style={Styles.error}>{guideIdError}</Text> : null}
      <TextInput
        value={formDataGuide.email}
        onChangeText={(value) => handleInputChange("email", value)}
        placeholder="Email"
        style={Styles.input}
      />
      {emailError ? <Text style={Styles.error}>{emailError}</Text> : null}
      <TextInput
        value={formDataGuide.phone}
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
      <TouchableOpacity onPress={handleSubmitGuide} style={Styles.button}>
        <Text style={Styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
