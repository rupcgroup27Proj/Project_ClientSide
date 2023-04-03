import { Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Styles } from "./Styles";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";

export default function AllDelegetions({ delegation, navigation }) {
  const [delegations, setDelegations] = useState([]);

  useEffect(() => {
    getAllDelegetions();
  }, []);

  function getAllDelegetions() {
    axios
      .get(`http://10.0.2.2:5283/api/Journeys/GetJourneyList`)
      .then((res) => {
        setDelegations(res.data);
      })
      .catch((err) => console.log("getAllDelegetions " + err));
  }

  const todayDate = new Date();

  const pastDelegations = delegations.filter((delegation) => {
    const endDate = new Date(delegation.endDate);
    return endDate < todayDate;
  });

  const presentDelegations = delegations.filter((delegation) => {
    const endDate = new Date(delegation.endDate);
    return endDate >= todayDate;
  });

  return (
    <ScrollView style={Styles.container}>
      <Text style={Styles.title}>Past Delegations</Text>
      {pastDelegations.map((delegation) => {
        return (
          <Text
            key={delegation.groupId}
            style={Styles.subtitle}
            onPress={() =>
              navigation.navigate("DetailsDelegation", {
                delegation: delegation,
              })
            }
          >
            {delegation.schoolName}
          </Text>
        );
      })}

      <Text style={Styles.title}>Present Delegations</Text>
      {presentDelegations.map((delegation) => {
        return (
          <Text
            key={delegation.groupId}
            style={Styles.subtitle}
            onPress={() =>
              navigation.navigate("DetailsDelegation", {
                delegation: delegation,
              })
            }
          >
            {delegation.schoolName}
          </Text>
        );
      })}
    </ScrollView>
  );
}
