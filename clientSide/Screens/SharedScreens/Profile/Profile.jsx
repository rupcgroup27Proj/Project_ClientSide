import { View, Text, StyleSheet } from "react-native";
import React from "react";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import { Divider, useTheme } from "react-native-paper";
import { useUser } from "../../../Components/Contexts/UserContext";

const Profile = () => {
  const { currentUser } = useUser();
  console.log(currentUser);
  const theme = useTheme();

  return (
    <View>
      <View
        style={{
          height: 100,
          // alignItems: "center",
          // justifyContent: "center",
          backgroundColor: theme.colors.backdrop,
        }}
      >
        <IoniconsIcon name="ios-person-circle-sharp" size={50} color="black">
          <Text
            style={styles.userName}
          >{`${currentUser.firstName} ${currentUser.lastName}`}</Text>
        </IoniconsIcon>
      </View>

      <View
        style={{ backgroundColor: theme.colors.primary, paddingHorizontal: 15 }}
      >
        <Text style={styles.userDetails}>ID</Text>
        <Text style={styles.userDetails}>{currentUser.personalId}</Text>
        <Divider bold={true} />

        <Text style={styles.userDetails}>PHONE</Text>
        <Text style={styles.userDetails}>{currentUser.phone}</Text>
        <Divider bold={true} />

        <Text style={styles.userDetails}>EMAIL</Text>
        <Text style={styles.userDetails}>{currentUser.email}</Text>
        <Divider bold={true} />

        <Text style={styles.userDetails}>PARENT PHONE</Text>
        <Text style={styles.userDetails}>{currentUser.parentPhone}</Text>
        <Divider bold={true} />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  userName: {
    fontWeight: "bold",
    fontSize: 20,
  },
  userDetails: {
    fontSize: 15,
    marginBottom: 5,
    marginTop: 10,
  },
});
