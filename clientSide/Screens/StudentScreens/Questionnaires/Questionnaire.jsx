
import React from 'react';
import {  View, Text } from 'react-native';


const Questionnaire = ({ route }) => {
    const { id } = route.params;
  
    return (
      <View>
        <Text>Questionnaire {id}</Text>
      </View>
    );
  };

  export default Questionnaire;