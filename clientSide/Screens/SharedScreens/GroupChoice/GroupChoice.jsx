import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
// import { Styles } from "./Styles"
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, IconButton, List, Divider, Button } from 'react-native-paper';
import axios from 'axios';
import { useAPI } from '../../../Components/Contexts/APIContext';
import { useUser } from '../../../Components/Contexts/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GroupChoice = () => {

  const { simulatorAPI } = useAPI();
  const { currentUser, setCurrentUser, logout } = useUser();
  const [groups, setGroups] = useState([]);
  const [activeAccordion, setActiveAccordion] = useState(null);

  const getJourneys = () => {
    axios.get(`${simulatorAPI}/api/Journeys/GetUserJourneys/userId/${currentUser.personalId}/userType/${currentUser.type}`)
      .then((res) => {
        console.log("Sucsses!" + res.data);
        setGroups(res.data);
      })
      .catch((err) => console.log("Error" + err));
  }


  useEffect(() => {
    getJourneys();
  }, []);


  const toggleAccordion = (index) => {
    if (activeAccordion === index)
      setActiveAccordion(null);
    else
      setActiveAccordion(index);
  };

  const setGroup = async (groupId) => {
    await AsyncStorage.setItem('currentUser', JSON.stringify({ ...currentUser, groupId: groupId }));
    setCurrentUser({ ...currentUser, groupId: groupId });
  }

  const dateFormat = (sd, ed) => {
    const sday = sd.getDate();
    const smonth = sd.getMonth() + 1; //months are 0-based, so we add 1
    const syear = sd.getFullYear();
    const eday = ed.getDate();
    const emonth = ed.getMonth() + 1; //months are 0-based, so we add 1
    const eyear = ed.getFullYear();
    return `${sday.toString().padStart(2, "0")}/${smonth.toString().padStart(2, "0")}/${syear} - ${eday.toString().padStart(2, "0")}/${emonth.toString().padStart(2, "0")}/${eyear}`;
  }


  return (
    <ScrollView style={{ marginTop: 40 }}>

      <View style={{ flexDirection: 'row',justifyContent:'space-between', marginHorizontal:10 ,alignItems:'center'}}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', paddingBottom: 5, textAlign: 'center' }}>Select a group:</Text>
        <Button onPress={() => logout()}>Logout</Button>
      </View>

      <Divider bold={true} />
      {groups.map((group, index) => (
        <View key={group.groupId}>
          <List.Accordion
            title={`${group.groupId} - ${group.schoolName}`}
            titleStyle={{ fontWeight: 'bold', color: '#2196F3' }}
            expanded={activeAccordion === index}
            onPress={() => toggleAccordion(index)}
            left={(props) => <List.Icon {...props} icon="school" />}
          >
            <List.Item
              title="Dates"
              description={dateFormat(new Date(group.startDate), new Date(group.endDate))}
              left={(props) => <List.Icon {...props} icon="calendar" />}
            />
            <Divider />
            <List.Item
              title="Teacher"
              description={`${group.teacherFirstName} ${group.teacherLastName}`}
              left={(props) => <List.Icon {...props} icon="account" />}
            />
            <Divider />
            <List.Item
              title="Teacher Email"
              description={group.teacherEmail}
              left={(props) => <List.Icon {...props} icon="email" />}
            />
            <Divider />
            <List.Item
              title="Teacher Phone"
              description={group.phoneTeacher}
              left={(props) => <List.Icon {...props} icon="phone" />}
            />
            <Divider />
            <List.Item
              title="Guide"
              description={`${group.guideFirstName} ${group.guideLastName}`}
              left={(props) => <List.Icon {...props} icon="account-group" />}
            />
            <Divider />
            <List.Item
              title="Guide Email"
              description={group.guideEmail}
              left={(props) => <List.Icon {...props} icon="email" />}
            />
            <Divider />
            <List.Item
              title="Guide Phone"
              description={group.phoneGuide}
              left={(props) => <List.Icon {...props} icon="phone" />}
            />
            <Divider />
            <List.Item
              style={{ backgroundColor: '#2196F3' }}
              description={'Enter'}
              descriptionStyle={{ textAlign: 'center', paddingRight: 50, color: 'white', fontWeight: 'bold', height:40, paddingBottom:15}}
              onPress={() => { setGroup(group.groupId) }}
            >
            </List.Item>
          </List.Accordion>
          <Divider />
        </View>
      ))}
    </ScrollView>
  );
};


export default GroupChoice