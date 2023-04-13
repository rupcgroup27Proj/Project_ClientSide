import { View } from "react-native";
import { Styles } from "./Styles"
import React from "react";
import { useUser } from "../../../Components/Contexts/UserContext";
import { Avatar, Title, Subheading, Paragraph } from 'react-native-paper';

const Profile = () => {
  const { currentUser } = useUser();


  return (
    <View style={Styles.container}>
      <Avatar.Image size={150} source={{ uri: 'https://placeimg.com/200/200/people' }} />
      <Title style={Styles.name}>{currentUser.firstName} {currentUser.lastName}</Title>
      <Subheading style={Styles.email}>{currentUser.email}</Subheading>
      <Paragraph style={Styles.phone}>{currentUser.phone}</Paragraph>
      <Paragraph style={Styles.id}>{currentUser.personalId}</Paragraph>
    </View>
  );
};


export default Profile;

