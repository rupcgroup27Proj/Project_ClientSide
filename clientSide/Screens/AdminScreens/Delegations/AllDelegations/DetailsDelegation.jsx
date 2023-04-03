import { Text, View } from "react-native";
import React from "react";
import { Styles } from "./Styles";
import { ScrollView } from "react-native-gesture-handler";

export default function DetailsDelegation({ route }) {
  const { delegation } = route.params;

  return (
    <ScrollView style={Styles.container}>
      <Text style={Styles.title}>Delegation Details</Text>
      <View>
        <Text style={Styles.subtitle}>Group ID:</Text>
        <Text>{delegation.groupId}</Text>
      </View>
      <View>
        <Text style={Styles.subtitle}>School Name:</Text>
        <Text>{delegation.schoolName}</Text>
      </View>
      <View>
        <Text style={Styles.subtitle}>Teacher Name:</Text>
        <Text>
          {delegation.teacherFirstName} {delegation.teacherLastName}
        </Text>
      </View>
      <View>
        <Text style={Styles.subtitle}>Teacher ID:</Text>
        <Text>{delegation.teacherId}</Text>
      </View>
      <View>
        <Text style={Styles.subtitle}>Teacher Email:</Text>
        <Text>{delegation.teacherEmail}</Text>
      </View>
      <View>
        <Text style={Styles.subtitle}>Teacher Phone:</Text>
        <Text>{delegation.phoneTeacher}</Text>
      </View>
      <View>
        <Text style={Styles.subtitle}>Guide Name:</Text>
        <Text>
          {delegation.guideFirstName} {delegation.guideLastName}
        </Text>
      </View>
      <View>
        <Text style={Styles.subtitle}>Guide ID:</Text>
        <Text>{delegation.guideId}</Text>
      </View>
      <View>
        <Text style={Styles.subtitle}>Guide Email:</Text>
        <Text>{delegation.guideEmail}</Text>
      </View>
      <View>
        <Text style={Styles.subtitle}>Guide Phone:</Text>
        <Text>{delegation.phoneGuide}</Text>
      </View>
      <View>
        <Text style={Styles.subtitle}>Start Date:</Text>
        <Text>{delegation.startDate}</Text>
      </View>
      <View>
        <Text style={Styles.subtitle}>End Date:</Text>
        <Text>{delegation.endDate}</Text>
      </View>
    </ScrollView>
  );
}
