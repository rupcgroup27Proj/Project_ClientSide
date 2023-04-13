import React, { useState } from 'react';
import { Text } from 'react-native';
import { Styles } from "./Styles"
import { TextInput, Button, Divider } from 'react-native-paper';
import axios from 'axios';
import * as DocumentPicker from 'expo-document-picker';
import { ScrollView } from 'react-native-gesture-handler';
import { useUser } from '../../../../Components/Contexts/UserContext';
import { useTeacher } from '../../../../Components/Contexts/TeacherContext';
import { useAPI } from '../../../../Components/Contexts/APIContext';

const AddUsers = () => {
  const [fileUri, setFileUri] = useState('');//Excel useState

  const { currentUser, fetchStudents } = useUser();
  const { startDate, endDate } = useTeacher();

  const [studentId, setStudentId] = useState('147')
  const [firstName, setFirstName] = useState('p');
  const [lastName, setLastName] = useState('student');
  const [password, setPassword] = useState('147');
  const [phone, setPhone] = useState('1471471477');
  const [email, setEmail] = useState('pStudent@gmail.com');
  const [parentPhone, setParentPhone] = useState('1114447777');
  const { simulatorAPI } = useAPI();

  const emailRegex = /^\S+@\S+\.\S{2,}$/;

  //Single student function
  const handleAddStudent = () => {
    if (!firstName || !lastName || !phone || !email || !parentPhone || !studentId || !password) {
      alert('Please fill all fields');
      return;
    }
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    const newStudent = {
      password: password,
      studentId: parseInt(studentId),
      firstName: firstName,
      lastName: lastName,
      phone: parseFloat(phone),
      email: email,
      parentPhone: parseFloat(parentPhone),
      pictureUrl: '',
      groupId: currentUser.groupId,
      startDate: startDate,
      endDate: endDate,
      type: "Student"
    };

    axios.post(`${simulatorAPI}/api/Students`, newStudent)
      .then(response => {
        alert('Student added successfully');
        setStudentId('');
        setFirstName('');
        setLastName('');
        setPassword('');
        setPhone('');
        setEmail('');
        setParentPhone('');
        fetchStudents();
      })
      .catch(error => {
        console.log(error);
        alert('Failed to add student');
      });
  };

  //Several students functions (using excel)
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      copyToCacheDirectory: false,
    });

    if (result.type === 'success') {
      setFileUri(result.uri);
    }
  };

  const uploadFile = () => {
    let formData = new FormData();
    let file = {
      uri: fileUri,
      name: 'file.xlsx',
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    };

    formData.append('file', file);

    axios.post('http://your-server-url.com/upload', formData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
        alert('Failed to upload the file');
      });
    setFileUri('');
  };


  return (
    <ScrollView style={Styles.container}>
      <Text style={Styles.title}>Add student</Text>
      <Divider bold={true} />
      <TextInput
        label="Student ID"
        value={studentId}
        onChangeText={text => setStudentId(text)}
        keyboardType="numeric"
        style={Styles.input}
      />
      <TextInput
        label="First Name"
        value={firstName}
        onChangeText={text => setFirstName(text)}
        style={Styles.input}
      />
      <TextInput
        label="Last Name"
        value={lastName}
        onChangeText={text => setLastName(text)}
        style={Styles.input}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType='email-address'
        style={Styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        style={Styles.input}
      />
      <TextInput
        label="Phone"
        value={phone}
        onChangeText={text => setPhone(text)}
        keyboardType="numeric"
        style={Styles.input}
      />
      <TextInput
        label="Parent Phone"
        value={parentPhone}
        onChangeText={text => setParentPhone(text)}
        keyboardType="numeric"
        style={Styles.input}
      />

      <Button mode="contained" icon='account-plus' onPress={handleAddStudent} style={Styles.button}>Add Student</Button>


      <Divider bold={true} />


      <Text style={Styles.title}>Add students using Excel</Text>
      <Divider bold={true} />
      <>
        {fileUri
          ? (<Text>Selected file: {fileUri}</Text>)
          : (<Button mode='contained' icon='account-multiple-plus' onPress={pickDocument} style={Styles.button}>Pick an Excel file</Button>)
        }
        {fileUri && <Button mode='contained' icon='account-multiple-plus' onPress={uploadFile} style={Styles.button}>Upload file</Button>}
      </>

    </ScrollView>
  );
};

export default AddUsers;














