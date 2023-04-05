import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useUser } from "../../../Components/Contexts/UserContext";

const Profile = () => {
  const { currentUser } = useUser();
  //console.log(currentUser);
  return (
    <View>
      <View style={styles.container}>
        <Text
          style={styles.userName}
        >{`${currentUser.firstName} ${currentUser.lastName}`}</Text>
        <Text style={styles.userDetails}>{currentUser.email}</Text>
        <Text style={styles.userDetails}>{currentUser.phone}</Text>
        <Text style={styles.userDetails}>{`ID: ${currentUser.id}`}</Text>
      </View>
    </View>
  );
};

export default Profile

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 10,
  },
  userDetails: {
    fontSize: 18,
    marginBottom: 5,
  },
});
