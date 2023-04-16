import { Text, View } from 'react-native';
import React from 'react';
import { Styles } from "./Styles"
import { useTeacher } from '../../../Components/Contexts/TeacherContext';


const Home = () => {
  
  const { journeyStarted, startDate, remainingDays } = useTeacher();

  if (!journeyStarted && startDate === "1950-01-01T00:00:00")
    return <Text style={{ fontSize: 16, marginHorizontal: 10, marginVertical: 20 }}>Wait for the teacher to update the delegation's dates.</Text>

  else if (journeyStarted) {
    if (remainingDays)
      return (
        <>
          <Text style={{ fontSize: 24, marginHorizontal: 10, marginVertical: 20, textAlign: 'center' }}>Remaining days until delegetion starts: </Text>
          <Text style={{ fontSize: 50, textAlign: 'center', color: '#2196F3', fontWeight: 'bold' }}>{remainingDays}</Text>
        </>
      )

    else
      return <Text>Home</Text>
  }
  else {
    return null;
  }
}

export default Home

