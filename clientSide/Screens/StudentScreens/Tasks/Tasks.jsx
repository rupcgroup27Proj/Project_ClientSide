import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Dimensions, Linking } from 'react-native';
import { useUser } from '../../../Components/Contexts/UserContext';
import { useAPI } from '../../../Components/Contexts/APIContext';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider, List } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';


export default function Tasks() {
  const { currentUser } = useUser();
  const { simulatorAPI } = useAPI();
  const [data, setData] = useState([]);
  const [due, setDue] = useState([]);
  const [submitted, setSubmitted] = useState([]);
  const [expandedDue, setExpandedDue] = React.useState(false);
  const [expandedSubmitted, setExpandedSubmitted] = React.useState(false);
  const [allSub, setAllSub] = useState([]);
  const navigation = useNavigation();

  const handlePressDue = () => setExpandedDue(!expandedDue);
  const handlePressSubmitted = () => setExpandedSubmitted(!expandedSubmitted);


  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getSubmission();
  }, [data]);

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  const getData = async () => {
    await axios
      .get(`${simulatorAPI}/api/Tasks/groupId/${currentUser.groupId}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log("getAllTasks " + err));
  };


  const getSubmission = async () => {
    await axios.get(`${simulatorAPI}/api/Submissions/studentId/${currentUser.id}`)
      .then((res) => {
        if (res.data.length == 0) {
          setDue(data);
        }
        else {
          setSubmitted(data.filter(obj => res.data.includes(obj.taskId)));
          setDue(data.filter(obj => !res.data.includes(obj.taskId)));
          setAllSub(res.data);
        }
      })
      .catch((err) => console.log("getTask ", err));
  }


  const getGrade = async (taskId) => {
    const res = await axios.get(`${simulatorAPI}/api/Submissions/spec/studentId/${currentUser.id}/taskId/${taskId}`)
      .then((res) => {
        return res.data != 999 ? `Grade:${res.data}` : `Grade: Pending`
      })
  }



  return (
    <ScrollView style={{ backgroundColor: 'white', height: Dimensions.get('window').height }} >

      <List.Section>
        <List.Accordion
          title="Due"
          left={props => <List.Icon {...props} icon="clipboard-text-clock" />}
          expanded={expandedDue}
          onPress={handlePressDue}>
          {due.length == 0 ? (<List.Item key={1} title="None" />) : (
            <>
              {due.map((d, index) => (
                <>
                  <Divider></Divider>
                  <List.Item key={index} title={d.name} description={new Date(d.due).toLocaleDateString("en-GB")} right={props => <List.Icon {...props} icon="file-upload-outline" />}
                    onPress={() => { navigation.navigate("Submission", { d: d, isRefresh: false, mySub: 0 }); }}
                  />
                </>
              ))}
            </>
          )}
        </List.Accordion>

        <Divider bold={true}></Divider>

        <List.Accordion
          title="Submitted"
          left={props => <List.Icon {...props} icon="clipboard-text" />}
          expanded={expandedSubmitted}
          onPress={handlePressSubmitted}>
          {submitted.length == 0 ? (<List.Item key={1} title="None" />) : (
            <>
              {submitted.map((d, index) => (
                <>
                  <Divider></Divider>
                  <List.Item key={index} title={d.name} description='pending' right={props => <List.Icon {...props} icon="file-refresh-outline" />}
                    onPress={() => { navigation.navigate("Submission", { d: d, isRefresh: true, mySub: d.taskId }); }} />
                </>
              ))}
            </>
          )}
        </List.Accordion>
      </List.Section>
    </ScrollView >
  )
};

