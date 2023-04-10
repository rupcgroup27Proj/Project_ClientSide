//Formatted
import React, { useState } from 'react';
import { View, ImageBackground } from 'react-native';
import { ActivityIndicator, Button, TextInput, Title, Text } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list'
import { useTheme } from './Styles'

import { useUser } from '../../../Components/Contexts/UserContext';


const LoginScreen = () => {
  const styles = useTheme();
  
  const { login, isDisabled } = useUser(); //Destructuring the context for "login" function.
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');

  const data = [
    { key: '1', value: 'Student' },
    { key: '2', value: 'Teacher' },
    { key: '3', value: 'Guide' }
  ]

  const handleLogin = async () => {
    login(userId, password, userType)
  };


  return (
    <ImageBackground
      source={require('../../../assets/Images/LoginBackground.jpeg')}
      style={styles.background}
      blurRadius={1}
    >
      <View style={styles.container}>

        <Title style={styles.title}>Welcome!</Title>

        <SelectList
          search={false}
          setSelected={(val) => setUserType(val)}
          data={data}
          save="value"
          dropdownTextStyles={{ color: 'white' }}
        />
        <TextInput
          disabled={isDisabled}
          label="User ID"
          value={userId}
          onChangeText={text => setUserId(text)}
          style={styles.firstInput}
          keyboardType='numeric'
        />
        <TextInput
          disabled={isDisabled}
          label="Password"
          value={password}
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
          style={styles.input}
        />

        {isDisabled
          ?
          <ActivityIndicator size="large" />
          : <Button mode="contained" onPress={handleLogin} style={styles.button}>
            Login
          </Button>
        }
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;