import React, { useState, useEffect } from "react";
import { ScrollView, View, TouchableOpacity, Image } from "react-native";
import axios from "axios";
import { styles } from "./Styles";
import FavoriteIcon from "../SocialCloud/FavoriteIcon";
import { Card, Text } from "react-native-paper";
import { useUser } from "../../../Components/Contexts/UserContext";


export default function Favorites() {
  const [favorite, setFavorite] = useState([]);
  const { currentUser } = useUser();

  console.log(currentUser);


  useEffect(() => {
    userFavorites();
  }, []);

  //get user's favs
  const userFavorites = async () => {
    await axios
      .get(`http://10.0.2.2:5283/api/FavList/studentId/${currentUser.id}`)
      .then((res) => {
        setFavorite(res.data);
      })
      .catch((err) => console.log("userFavorites " + err));
  };

  //remove from favs
  function RemoveFav(postId, Tags) {
    const lowerCaseTags = Tags.map(tag => {
      const lowerCaseObj = {};
      for (const key in tag) {
        lowerCaseObj[key.charAt(0).toLowerCase() + key.slice(1)] = tag[key];
      }
      return lowerCaseObj;
    });
    axios
      .put(
        `http://10.0.2.2:5283/api/FavList/studentId/${currentUser.id}/postId/${postId}`, lowerCaseTags
      )
      .then((res) => {
        setFavorite((prevList) =>
          prevList.filter((fav) => fav.PostId !== postId)
        );
        userFavorites();
        //console.log("userFavorites ", JSON.stringify(favorite));
      })

      .catch((err) => {
        console.log("RemoveFav " + err);
      });
  }

  return (
    <ScrollView style={{ marginTop: 25 }}>
      {favorite.map((fav) => (
        <Card style={styles.card}>
          <View key={fav.PostId} style={styles.username}>
            <Image source={{ uri: fav.FileUrl }} style={styles.image}></Image>
          </View>
          <TouchableOpacity
            style={{ left: 360, bottom: 300 }}
            onPress={() => RemoveFav(fav.PostId, fav.Tags)}
          >
            <FavoriteIcon filled={true} />
          </TouchableOpacity>
          {fav.Tags.map((f) => (
            <TouchableOpacity
              key={f.TagId}
              style={{
                backgroundColor: "black",
                borderRadius: 16,
                paddingHorizontal: 16,
                paddingVertical: 8,
                margin: 4,
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
        </Card>
      ))}
    </ScrollView>
  );
}
