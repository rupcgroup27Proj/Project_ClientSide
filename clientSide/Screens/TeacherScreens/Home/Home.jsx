import { Styles } from "./Styles"
import React, { useState } from "react";
import { View, Button } from "react-native";
import { TextInput, Text } from "react-native-paper"
import { useTeacher } from "../../../Components/Contexts/TeacherContext";

const Home = () => {
  const { journeyStarted, startDate, updateJourney } = useTeacher();
  const [newStartDate, setNewStartDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");

  const handleSubmit = () => {
    updateJourney(newStartDate, newEndDate);
  };

  if (!journeyStarted && startDate === "1950") {
    return (
      <View>
        <TextInput
          value={newStartDate}
          onChangeText={setNewStartDate}
          placeholder="Start Date"
        />
        < TextInput
          value={newEndDate}
          onChangeText={setNewEndDate}
          placeholder="End Date"
        />
        <Button title="Update Journey" onPress={handleSubmit} />
      </View>
    );
  } else if (journeyStarted) {
    if (remainingDays) {
      return <Text>Remaining Days: {remainingDays}</Text>;
    } else {
      return <Text>Journey Started</Text>;
    }
  } else {
    return null;
  }
}

export default Home

