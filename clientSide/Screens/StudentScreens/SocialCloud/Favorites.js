import React, { useState, useEffect } from "react";
import { ScrollView, View, TouchableOpacity, Image } from "react-native";
import axios from "axios";
import { styles } from "./Styles";
import FavoriteIcon from "./FavoriteIcon";
import { Card } from "react-native-paper";

//temporary user for tests
const currentUser = {
  Type: "Student",
  GroupId: 0,
  UserId: 1,
  PersonalId: 111,
  Password: 111,
  FirstName: "Student1",
  LastName: "student1",
  Phone: 0,
  Email: "aa2@gmail.com",
  PictureUrl: null,
  ParentPhone: null,
  IsAdmin: 0,
  StartDate: "01/01/2020",
  EndDate: "02/02/2024",
};

export default function Favorites() {
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    userFavorites();
  }, []);

  //get user's favs
  const userFavorites = async () => {
    await axios
      .get(`http://10.0.2.2:5283/api/FavList/studentId/${currentUser.UserId}`)
      .then((res) => {
        setFavorite(res.data);
      })
      .catch((err) => console.log("userFavorites " + err));
  };

  // //remove from favs
  function RemoveFav(postId) {
    axios
      .delete(
        `http://10.0.2.2:5283/api/FavList/studentId/${currentUser.UserId}/postId/${postId}`
      )
      .then((res) => {
        setFavorite((prevList) =>
          prevList.filter((fav) => fav.postId !== postId)
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
          <View key={fav.postId} style={styles.username}>
            <Image source={{ uri: fav.fileUrl }} style={styles.image}></Image>
          </View>
          <TouchableOpacity
            style={{ left: 360, bottom: 300 }}
            onPress={() => RemoveFav(fav.postId)}
          >
            <FavoriteIcon filled={true} />
          </TouchableOpacity>
        </Card>
      ))}
    </ScrollView>
  );
}
