import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Text,
} from "react-native";
import { Styles } from "./Styles";
import { Button, Divider } from "react-native-paper";
import axios from "axios";
import { useAPI } from "../../../../Components/Contexts/APIContext";

export default function AddSchool() {
  const [schoolName, setSchoolName] = useState("");
  const [groupId, setGroupId] = useState("");
  const { simulatorAPI } = useAPI();

  const [formDataTeacher, setFormDataTeacher] = useState({
    password: "",
    teacherId: 0,
    firstName: "",
    lastName: "",
    phone: 0,
    email: "",
    pictureUrl: "",
    groupId: groupId,
    startDate: "2023-04-03T11:51:06.983Z",
    endDate: "2023-04-03T11:51:06.983Z",
    type: "Teacher",
  });

  const [formDataGuide, setFormDataGuide] = useState({
    password: "",
    guideId: 0,
    firstName: "",
    lastName: "",
    phone: 0,
    email: "",
    pictureUrl: "",
    groupId: groupId,
    startDate: "2023-04-03T11:51:06.983Z",
    endDate: "2023-04-03T11:51:06.983Z",
    type: "Guide",
  });

  const [schoolNameError, setSchoolNameError] = useState("");

  const [teacherFirstNameError, setTeacherFirstNameError] = useState("");
  const [teacherLastNameError, setTeacherLastNameError] = useState("");
  const [teacherIdError, setTeacherIdError] = useState("");
  const [teacherEmailError, setTeacherEmailError] = useState("");
  const [teacherPhoneError, setTeacherPhoneError] = useState("");
  const [teacherPasswordError, setTeacherPasswordError] = useState("");

  const [guidePasswordError, setGuidePasswordError] = useState("");
  const [guideIdError, setGuideIdError] = useState("");
  const [guideFirstNameError, setGuideFirstNameError] = useState("");
  const [guideLastNameError, setGuideLastNameError] = useState("");
  const [guidePhoneError, setGuidePhoneError] = useState("");
  const [guideEmailError, setGuideEmailError] = useState("");


  const validateTeacherPassword = (password) => {
    if (password.length < 6) {
      setTeacherPasswordError("Password should be at least 6 characters long");
    } else {
      setTeacherPasswordError("");
    }
  };

  const validateTeacherFirstName = (firstName) => {
    if (!/^[a-zA-Z]+$/.test(firstName)) {
      setTeacherFirstNameError("First name should only contain letters");
    } else {
      setTeacherFirstNameError("");
    }
  };

  const validateTeacherLastName = (lastName) => {
    if (!/^[a-zA-Z]+$/.test(lastName)) {
      setTeacherLastNameError("Last name should only contain letters");
    } else {
      setTeacherLastNameError("");
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

  const validateTeacherEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailRegex)) {
      setTeacherEmailError("Please enter a valid email address.");
    } else {
      setTeacherEmailError("");
    }
  };

  const validateTeacherPhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    if (!phone.match(phoneRegex)) {
      setTeacherPhoneError("Phone number should contain exactly 10 numbers.");
    } else {
      setTeacherPhoneError("");
    }
  };

  const handleTeacherInputChange = (field, value) => {
    setFormDataTeacher({ ...formDataTeacher, [field]: value });
    switch (field) {
      case "password":
        validateTeacherPassword(value);
        break;
      case "firstName":
        validateTeacherFirstName(value);
        break;
      case "lastName":
        validateTeacherLastName(value);
        break;
      case "teacherId":
        validateTeacherId(value);
        break;
      case "email":
        validateTeacherEmail(value);
        break;
      case "phone":
        validateTeacherPhone(value);
        break;
      default:
        break;
    }
  };

  const validateGuidePassword = (password) => {
    if (password.length < 6) {
      setGuidePasswordError("Password should be at least 6 characters long");
    } else {
      setGuidePasswordError("");
    }
  };

  const validateGuideFirstName = (firstName) => {
    if (!/^[a-zA-Z]+$/.test(firstName)) {
      setGuideFirstNameError("First name should only contain letters");
    } else {
      setGuideFirstNameError("");
    }
  };

  const validateGuideLastName = (lastName) => {
    if (!/^[a-zA-Z]+$/.test(lastName)) {
      setGuideLastNameError("Last name should only contain letters");
    } else {
      setGuideLastNameError("");
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

  const validateGuideEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailRegex)) {
      setGuideEmailError("Please enter a valid email address.");
    } else {
      setGuideEmailError("");
    }
  };

  const validateGuidePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    if (!phone.match(phoneRegex)) {
      setGuidePhoneError("Phone number should contain exactly 10 numbers.");
    } else {
      setGuidePhoneError("");
    }
  };

  const handleGuideInputChange = (field, value) => {
    setFormDataGuide({ ...formDataGuide, [field]: value });
    switch (field) {
      case "password":
        validateGuidePassword(value);
        break;
      case "firstName":
        validateGuideFirstName(value);
        break;
      case "lastName":
        validateGuideLastName(value);
        break;
      case "guideId":
        validateGuideId(value);
        break;
      case "email":
        validateGuideEmail(value);
        break;
      case "phone":
        validateGuidePhone(value);
        break;
      default:
        break;
    }
  };

  //send to server
  function Submit() {
    // Check if all fields are filled
    if (
      !schoolName ||
      !formDataTeacher.firstName ||
      !formDataTeacher.lastName ||
      !formDataTeacher.teacherId ||
      !formDataTeacher.email ||
      !formDataTeacher.phone ||
      !formDataTeacher.password ||
      !formDataGuide.firstName ||
      !formDataGuide.lastName ||
      !formDataGuide.guideId ||
      !formDataGuide.email ||
      !formDataGuide.phone ||
      !formDataGuide.password
    ) {
      alert("Please fill in all the fields.");
      return;
    }

    // Check if all fields are valid
    if (
      schoolNameError ||
      teacherFirstNameError ||
      teacherLastNameError ||
      teacherIdError ||
      teacherEmailError ||
      teacherPhoneError ||
      teacherPasswordError ||
      guideFirstNameError ||
      guideLastNameError ||
      guideIdError ||
      guideEmailError ||
      guidePhoneError ||
      guidePasswordError
    ) {
      console.log("Please correct the errors in the form.");
      return;
    }

    axios
      .post(`${simulatorAPI}/api/Journeys/schoolName/${schoolName}`)
      .then((res) => {
        setGroupId(res.data);
        console.log({
          ...formDataTeacher,
          groupId: groupId,
        });
        axios
          .post(`${simulatorAPI}/api/Teachers`, {
            ...formDataTeacher,
            groupId: groupId,
          })
          .then((res) => {
            console.log("SCC in formDataTeacher ", res);
          })
          .catch((error) => console.log("ERR in formDataTeacher", error));

        axios
          .post(`${simulatorAPI}/api/Guides`, {
            ...formDataGuide,
            groupId: groupId,
          })
          .then((res) => {
            console.log("SCC in formDataGuide ", res);
          })
          .catch((error) => console.log("ERR in formDataGuide", error));
      })
      .catch((err) => {
        console.log("sendSchooll " + err);
      });
  }

  return (
    <ScrollView
      style={{
        backgroundColor: "#33383E",
        marginTop: 40,
        height: "100%",
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
          color: "white",
          alignSelf: "center",
        }}
      >
        Add New Delegation
      </Text>
      <Divider></Divider>
      <View>
        <Text style={Styles.userTitle}>School Details</Text>
        <TextInput
          value={schoolName}
          onChangeText={(value)=>setSchoolName(value)}
          placeholder="School Name"
          placeholderTextColor={"grey"}
          cursorColor={"grey"}
          style={Styles.input}
        />
        {schoolNameError ? (
          <Text style={Styles.error}>{schoolNameError}</Text>
        ) : null}
      </View>
      <View>
        <Text style={Styles.userTitle}>Teacher Details</Text>
        <TextInput
          value={formDataTeacher.firstName}
          onChangeText={(value) =>
            נמ("firstName", value)
          }
          placeholder="First Name"
          placeholderTextColor={"grey"}
          cursorColor={"grey"}
          style={Styles.input}
        />
        {teacherFirstNameError ? (
          <Text style={Styles.error}>{teacherFirstNameError}</Text>
        ) : null}
        <TextInput
          value={formDataTeacher.lastName}
          placeholderTextColor={"grey"}
          cursorColor={"grey"}
          onChangeText={(value) =>
            handleTeacherInputChange("lastName", value)
          }
          placeholder="Last Name"
          style={Styles.input}
        />
        {teacherLastNameError ? (
          <Text style={Styles.error}>{teacherLastNameError}</Text>
        ) : null}
        <TextInput
          value={formDataTeacher.teacherId}
          placeholderTextColor={"grey"}
          cursorColor={"grey"}
          onChangeText={(value) => handleTeacherInputChange("teacherId", value)}
          placeholder="Id"
          style={Styles.input}
        />
        {teacherIdError ? (
          <Text style={Styles.error}>{teacherIdError}</Text>
        ) : null}
        <TextInput
          value={formDataTeacher.email}
          placeholderTextColor={"grey"}
          cursorColor={"grey"}
          onChangeText={(value) =>
            handleTeacherInputChange("email", value)
          }
          placeholder="Email"
          style={Styles.input}
        />
        {teacherEmailError ? (
          <Text style={Styles.error}>{teacherEmailError}</Text>
        ) : null}
        <TextInput
          value={formDataTeacher.phone}
          placeholderTextColor={"grey"}
          cursorColor={"grey"}
          onChangeText={(value) =>
            handleTeacherInputChange("phone", value)
          }
          placeholder="Phone Number"
          style={Styles.input}
        />
        {teacherPhoneError ? (
          <Text style={Styles.error}>{teacherPhoneError}</Text>
        ) : null}
        <TextInput
          value={formDataTeacher.password}
          placeholderTextColor={"grey"}
          cursorColor={"grey"}
          placeholder="Password"
          onChangeText={(value) =>
            handleTeacherInputChange("password", value)
          }
          style={Styles.input}
        />
        {teacherPasswordError ? (
          <Text style={Styles.error}>{teacherPasswordError}</Text>
        ) : null}
      </View>
      <View>
        <Text style={Styles.userTitle}>Guide Details</Text>
        <TextInput
          value={formDataGuide.firstName}
          placeholderTextColor={"grey"}
          cursorColor={"grey"}
          onChangeText={(value) =>
            handleGuideInputChange("firstName", value)
          }
          placeholder="First Name"
          style={Styles.input}
        />
        {guideFirstNameError ? (
          <Text style={Styles.error}>{guideFirstNameError}</Text>
        ) : null}
        <TextInput
          value={formDataGuide.lastName}
          placeholderTextColor={"grey"}
          cursorColor={"grey"}
          onChangeText={(value) =>
            handleGuideInputChange("lastName", value)
          }
          placeholder="Last Name"
          style={Styles.input}
        />
        {guideLastNameError ? (
          <Text style={Styles.error}>{guideLastNameError}</Text>
        ) : null}
        <TextInput
          value={formDataGuide.guideId}
          placeholderTextColor={"grey"}
          cursorColor={"grey"}
          onChangeText={(value) => handleGuideInputChange("guideId", value)}
          placeholder="Id"
          style={Styles.input}
        />
        {guideIdError ? <Text style={Styles.error}>{guideIdError}</Text> : null}
        <TextInput
          value={formDataGuide.email}
          placeholderTextColor={"grey"}
          cursorColor={"grey"}
          onChangeText={(value) => handleGuideInputChange("email", value)}
          placeholder="Email"
          style={Styles.input}
        />
        {guideEmailError ? (
          <Text style={Styles.error}>{guideEmailError}</Text>
        ) : null}
        <TextInput
          value={formDataGuide.phone}
          placeholderTextColor={"grey"}
          cursorColor={"grey"}
          onChangeText={(value) => handleGuideInputChange("phone", value)}
          placeholder="Phone Number"
          style={Styles.input}
        />
        {guidePhoneError ? (
          <Text style={Styles.error}>{guidePhoneError}</Text>
        ) : null}
        <TextInput
          value={formDataGuide.password}
          placeholderTextColor={"grey"}
          cursorColor={"grey"}
          placeholder="Password"
          onChangeText={(value) =>
            handleGuideInputChange("password", value)
          }
          style={Styles.input}
        />
        {guidePasswordError ? (
          <Text style={Styles.error}>{guidePasswordError}</Text>
        ) : null}
      </View>
      <View>
        <Button onPress={Submit} mode="contained" style={Styles.b}>Confirm</Button>
      </View>
    </ScrollView>
  );
}
