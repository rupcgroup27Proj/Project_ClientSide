import { Dimensions, ImageBackground, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import { Styles } from "./Styles"
import { useTeacher } from '../../../Components/Contexts/TeacherContext';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AllQuestionnaires from '../Questionnaires/AllQuestionnaires';
import { useUser } from '../../../Components/Contexts/UserContext';
import { IconButton } from 'react-native-paper';


const Home = () => {

  const { journeyStarted, startDate, remainingDays } = useTeacher();
  const navigation = useNavigation();
  const { currentUser } = useUser();

  if (!journeyStarted && startDate === "1950-01-01T00:00:00")
    return (
      <ImageBackground source={require('../../../assets/Images/Homeback.png')} style={{ height: Dimensions.get('window').height }} >
        <Text style={{ fontSize: 16, marginHorizontal: 10, marginVertical: 20, textAlign:'center', color:'#2196F3'}}>Wait for the teacher to update the delegation's dates.</Text>
      </ImageBackground>
    )

  else if (journeyStarted) {
    if (remainingDays)
      return (
        <ImageBackground source={require('../../../assets/Images/Homeback.png')} style={{ height: Dimensions.get('window').height }} >
          <Text style={{ fontSize: 24, marginHorizontal: 10, marginVertical: 20, textAlign: 'center' }}>Remaining days until delegetion starts: </Text>
          <Text style={{ fontSize: 50, textAlign: 'center', color: '#2196F3', fontWeight: 'bold' }}>{remainingDays}</Text>
        </ImageBackground>
      )

    else
      return (
        <ImageBackground source={require('../../../assets/Images/Homeback.png')} style={{ height: Dimensions.get('window').height }} >

        <View style={Styles.con}>

            <Text style={Styles.title}>Hello {currentUser.firstName}!</Text>
            <View style={Styles.ibView}>
              <View style={Styles.ibSubView}>
                <IconButton icon="progress-question" iconColor={'#2196F3'} size={80} mode={'contained'} containerColor={'rgba(255, 255, 255, 0.9)'} animated={true} onPress={() => navigation.navigate('All Questionnaires')} />
                <Text style={Styles.ibText}>All Questionnaires</Text>
              </View>
            </View>
            <View style={Styles.recView}>
            </View>
          </View>
      </ImageBackground>
      )
  }
  else {
    return null;
  }
}

export default Home

