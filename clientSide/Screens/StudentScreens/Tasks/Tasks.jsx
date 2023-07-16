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
  const [expandedDue, setExpandedDue] = React.useState(true);
  const [expandedSubmitted, setExpandedSubmitted] = React.useState(true);
  const [det, setDet] = useState([]);
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
        }
      })
      .catch((err) => console.log("getTask ", err));
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
                    onPress={() => { navigation.navigate("Submission", { d: d, isRefresh: false }); }}
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
                  <List.Item key={index} title={d.name} description={d.grade ? `Grade:${d.grade}` : `Grade: Pending`} right={props => <List.Icon {...props} icon="file-refresh-outline" />}
                    onPress={() => { navigation.navigate("Submission", { d: d, isRefresh: true }); }} />
                </>
              ))}
            </>
          )}
        </List.Accordion>
      </List.Section>
    </ScrollView >
  )
};

