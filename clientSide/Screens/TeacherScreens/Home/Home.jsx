import { Styles } from "./Styles"
import { useTeacher } from "../../../Components/Contexts/TeacherContext";
import { View, Alert } from "react-native";
import { TextInput, Text, IconButton, Button, Divider } from "react-native-paper"
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";


const Home = () => {
  
  const { journeyStarted, startDate, updateJourney, remainingDays } = useTeacher();
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [startDateSelected, setStartDateSelected] = useState(new Date());
  const [endDateSelected, setEndDateSelected] = useState(new Date());

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



  if (!journeyStarted && startDate === "1950-01-01T00:00:00") {
    return (
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
    );
  }

  else if (journeyStarted) {
    if (remainingDays)
      return (
        <>
          <Text style={{ fontSize: 24, marginHorizontal: 10, marginVertical: 20, textAlign:'center'}}>Remaining days until delegetion starts: </Text>
          <Text style={{ fontSize: 50, textAlign:'center', color:'#2196F3', fontWeight:'bold'}}>{remainingDays}</Text>
        </>
      )
    else
      return <Text>Home</Text>;
  }
  else {
    return null;
  }
}

export default Home

