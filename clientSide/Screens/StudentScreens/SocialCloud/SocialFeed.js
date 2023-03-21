import { View } from "react-native";
import React, { useState, useEffect } from "react";
import { Styles } from "./Styles";
import { IconButton } from "react-native-paper";

export default function SocialFeed({ navigation }) {

  useEffect(() => {
    
  });

  return (
    <>
      <View>
        <IconButton
          style={Styles.iconCamera}
          onPress={() => {
            navigation.navigate("NewPost");
          }}
          icon="camera"
          size={25}
          iconColor="#fff"
        />
      </View>
      <View>
        
      </View>
    </>
  );
}
