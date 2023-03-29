import React, { useState } from 'react';
import { View, Alert, ImageBackground } from 'react-native';
import { Button, TextInput, Title } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { SelectList } from 'react-native-dropdown-select-list'
import { styles } from './Styles'
import { useUser } from '../../../Components/Contexts/UserContext';


const LoginScreen = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const { login } = useUser();

  const data = [
    { key: '1', value: 'Student' },
    { key: '2', value: 'Teacher' },
    { key: '3', value: 'Guide' },
  ]

  const handleLogin = async () => {
    login(userId, password, userType)
  };


  return (
    <ImageBackground
      source={require('../../../Images/LoginBackground.jpeg')}
      style={styles.background}
      blurRadius={1}
    >
      <View style={styles.container}>

        <Title style={styles.title}>Login Screen</Title>

        <SelectList
          search={false}
          setSelected={(val) => setUserType(val)}
          data={data}
          save="value"
          dropdownTextStyles={{ color: 'white' }}
        />
        <TextInput
          label="User ID"
          value={userId}
          onChangeText={text => setUserId(text)}
          style={styles.firstInput}
          theme={{ colors: { primary: '#FFFFFF' } }}
        />
        <TextInput
          label="Password"
          value={password}
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          theme={{ colors: { primary: '#FFFFFF' } }}
        />
        <Button mode="contained" onPress={handleLogin} buttonColor='#035afc' style={styles.button}>
          Login
        </Button>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;