import React, { useState } from 'react';
import { View, StyleSheet, Alert, ImageBackground } from 'react-native';
import { Button, TextInput, Title } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const LoginScreen = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!userId || !password) {
      Alert.alert('Error', 'User ID and password fields cannot be empty.');
      return;
    }

    try {
      const response = await axios.get(`https://example.com/api/user/${userId}`);
      const currentUser = response.data;
      await AsyncStorage.setItem('currentUser', JSON.stringify(currentUser));
      // handle successful login here
    } catch (error) {
      // handle error here
    }
  };

  return (
    <ImageBackground
      source={require('../../../Images/LoginBackground.jpg')}
      style={styles.background}
      blurRadius={3}
    >
      <View style={styles.container}>
        <Title style={styles.title}>Welcome back!</Title>
        <TextInput
          label="User ID"
          value={userId}
          onChangeText={text => setUserId(text)}
          style={styles.input}
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
        <Button mode="contained" onPress={handleLogin} style={styles.button}>
          Login
        </Button>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 20,
    borderRadius: 10,
  },
  button: {
    marginTop: 20,
    borderRadius: 10,
  },
});

export default LoginScreen;
