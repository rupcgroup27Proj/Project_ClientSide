import { Styles } from "./Styles"
import { useTeacher } from "../../../Components/Contexts/TeacherContext";
import { View, Alert, ImageBackground, Dimensions } from "react-native";
import { TextInput, Text, IconButton, Button, Divider, Card } from "react-native-paper"
import DateTimePicker from '@react-native-community/datetimepicker';
import { useCallback, useState } from "react";
import { useAPI } from "../../../Components/Contexts/APIContext";
import { useUser } from "../../../Components/Contexts/UserContext";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";


const Home = () => {

  const { simulatorAPI } = useAPI();
  const { currentUser } = useUser();
  const navigation = useNavigation();
  const { journeyStarted, startDate, updateJourney, remainingDays } = useTeacher();
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [startDateSelected, setStartDateSelected] = useState(new Date());
  const [endDateSelected, setEndDateSelected] = useState(new Date());
  const [posts, setPosts] = useState([]);


  const handleStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDateSelected;
    setShowStartDatePicker(false);
    setStartDateSelected(currentDate);

  };

  const handleEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDateSelected;
    setShowEndDatePicker(false);
    setEndDateSelected(currentDate);

  };

  const showStartDatepicker = () => {
    setShowStartDatePicker(true);
  };

  const showEndDatepicker = () => {
    setShowEndDatePicker(true);
  };

  const onCancel = () => {
    setShowStartDatePicker(false);
    setShowEndDatePicker(false);
  };


  const handleSubmit = () => {
    if (!startDateSelected || !endDateSelected) {
      Alert.alert("Validation Error", "Please select start and end dates");
      return;
    }
    const today = new Date();
    if (endDateSelected.getTime() < startDateSelected.getTime()) {
      Alert.alert("Validation Error", "End date cannot be earlier than start date");
      return;
    }
    if (startDateSelected.getTime() < today.getTime() || endDateSelected.getTime() < today.getTime()) {
      Alert.alert("Validation Error", "Selected dates cannot be earlier than today's date");
      return;
    }
    updateJourney(startDateSelected, endDateSelected);
  };

  async function getAllPosts() {
    await axios.get(`${simulatorAPI}/api/SocialCloud/groupId/${currentUser.groupId}`)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.log("getAllPosts " + err));
  }

  useFocusEffect(
    useCallback(() => {
      getAllPosts();
    }, [])
  );


  if (!journeyStarted && startDate === "1950-01-01T00:00:00") {
    return (
      <ImageBackground source={require('../../../assets/Images/Homeback.png')} style={{ height: Dimensions.get('window').height }}>
        <View>
          <Text style={{ fontSize: 16, marginHorizontal: 10, marginVertical: 20 }}>Before we begin, please enter the delegation dates.</Text>

          <Divider bold={true}></Divider>

          <View style={{ flexDirection: 'row', margin: 10 }}>
            <TextInput
              disabled={true}
              value={startDateSelected.toDateString()}

              placeholder="Start Date"
              style={{ flex: 1 }}
            />
            <IconButton icon='calendar' onPress={showStartDatepicker} />
          </View>

          <View style={{ flexDirection: 'row', margin: 10 }}>
            <TextInput
              disabled={true}
              value={endDateSelected.toDateString()}

              placeholder="End Date"
              style={{ flex: 1 }}
            />
            <IconButton icon='calendar' onPress={showEndDatepicker} />
          </View>
          <Divider bold={true}></Divider>
          <Button mode='contained' onPress={handleSubmit} style={{ margin: 10 }}>Update Journey</Button>



          {showStartDatePicker && (
            <DateTimePicker
              minimumDate={new Date()}
              value={startDateSelected}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={handleStartDateChange}
            >
              <Button onPress={onCancel} mode='contained'>Cancel</Button>
            </DateTimePicker>
          )}
          {showEndDatePicker && (
            <DateTimePicker
              minimumDate={new Date()}
              value={endDateSelected}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={handleEndDateChange}
            >
              <Button onPress={onCancel} mode='contained'>Cancel</Button>
            </DateTimePicker>
          )}

        </View>
      </ImageBackground>
    );
  }

  else if (journeyStarted) {
    if (remainingDays)
      return (
        <ImageBackground source={require('../../../assets/Images/Homeback.png')} style={{ height: Dimensions.get('window').height }}>
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
                  <IconButton icon="phone-log" iconColor={'#2196F3'} size={50} mode={'contained'} containerColor={'rgba(255, 255, 255, 0.9)'} animated={true} onPress={() => navigation.navigate('Important numbers')} />
                  <Text style={Styles.ibText}>Numbers</Text>
                </View>
                <View style={Styles.ibSubView}>
                  <IconButton icon="bell-ring" iconColor={'#2196F3'} mode={'contained'} containerColor={'rgba(255, 255, 255, 0.9)'} size={50} onPress={() => navigation.navigate('Messages')} />
                  <Text style={Styles.ibText}>Messages</Text>
                </View>
                <View style={Styles.ibSubView}>
                  <IconButton icon="file-document-outline" iconColor={'#2196F3'} mode={'contained'} containerColor={'rgba(255, 255, 255, 0.9)'} size={50} onPress={() => navigation.navigate('Tasks')} />
                  <Text style={Styles.ibText}>Tasks </Text>
                </View>
              </View>

              <View style={Styles.postCon}>
                <Text style={Styles.simText} onPress={() => navigation.navigate('Social Cloud')}>Recent posts:</Text>
                <ScrollView horizontal={true} style={{ borderTopWidth: 0.5, borderColor: 'rgba(44, 199, 242, 0.9)' }}>

                  {posts.length === 0 ? (
                    <View>
                      <ImageBackground
                        source={require('../../../assets/Images/blurPosts.png')}
                        style={{ height: 200, width: Dimensions.get('window').width, display: 'flex', justifyContent: 'center' }}
                        blurRadius={1}
                      >
                        <Text style={Styles.noPostText}>No posts yet</Text>
                      </ImageBackground>
                    </View>

                  ) : (
                    <View style={{alignItems:'center', flexDirection:'row'}}>
                      {posts.map((post, index) => (
                        <Card key={index} style={Styles.card} onPress={() => navigation.navigate('Social Cloud')}>
                          <Card.Content>
                            <Text style={Styles.cardTitle}>{`${post.FirstName} ${post.LastName}`}</Text>
                          </Card.Content>
                          <Card.Cover source={{ uri: post.FileUrl }} />
                        </Card>
                      ))}
                    </View>
                  )}

                </ScrollView>
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

