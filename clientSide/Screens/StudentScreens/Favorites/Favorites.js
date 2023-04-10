import React, { useState, useEffect } from "react";
import { ScrollView, View, TouchableOpacity, Image } from "react-native";
import axios from "axios";
import { styles } from "./Styles";
import { Video } from "expo-av";
import FavoriteIcon from "../SocialCloud/FavoriteIcon";
import { Card, Text } from "react-native-paper";
import { useUser } from "../../../Components/Contexts/UserContext";
import { useAPI } from "../../../Components/Contexts/APIContext";

import { useFavorites } from "../../../Components/Contexts/FavoritesContext";

export default function Favorites() {
  const { currentUser } = useUser();
  const { simulatorAPI } = useAPI();

  const { favorite, userFavorites } = useFavorites();

  useEffect(() => {
    userFavorites()
  }, []);


  //remove from favs
  function RemoveFav(postId, Tags) {
    const lowerCaseTags = Tags.map((tag) => {
      const lowerCaseObj = {};
      for (const key in tag) {
        lowerCaseObj[key.charAt(0).toLowerCase() + key.slice(1)] = tag[key];
      }
      return lowerCaseObj;
    });
    axios
      .put(
        `${simulatorAPI}/api/FavList/studentId/${currentUser.id}/postId/${postId}`, lowerCaseTags
      )
      .then((res) => {      
        userFavorites();
      })

      .catch((err) => {
        console.log("RemoveFav " + err);
      });
  }

  return (
    <ScrollView>
      {favorite.map((fav) => (
        <Card style={styles.card}>
          <View key={fav.PostId}>
            <TouchableOpacity
              style={{ left: 360, top: 7, position: "relative" }}
              onPress={() => RemoveFav(fav.PostId, fav.Tags)}
            >
              <FavoriteIcon filled={true} />
            </TouchableOpacity>
            {/* <Card.Content>
              {fav.Type === "I" ? (
                <Image source={{ uri: fav.FileUrl }} style={styles.image} />
              ) : (
                <Video
                  source={{ uri: fav.FileUrl }}
                  useNativeControls={true}
                  resizeMode="contain"
                  style={styles.video}
                />
              )}
            </Card.Content> */}
            <Image source={{ uri: fav.FileUrl }} style={styles.image} />
          </View>
          <ScrollView horizontal={true}>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {fav.Tags.map((f) => (
                <TouchableOpacity
                  key={f.TagId}
                  style={{
                    backgroundColor: "gray",
                    borderRadius: 13,
                    paddingHorizontal: 8,
                    paddingVertical: 1,
                    margin: 4,
                    marginTop: 7,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                    }}
                  >
                    {f.TagName}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          {/* {fav.Tags.map((f) => (
            <TouchableOpacity
              key={f.TagId}
              style={{
                backgroundColor: "gray",
                borderRadius: 14,
                paddingHorizontal: 14,
                paddingVertical: 8,
                margin: 3,
              }}
            >
              <Text
                style={{
                  color: "white",
                }}
              >
                {f.TagName}
              </Text>
            </TouchableOpacity>
          ))} */}
        </Card>
      ))}
    </ScrollView>
  );
}
