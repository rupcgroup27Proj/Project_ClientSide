import React, { useEffect } from "react";
import { ScrollView, View, TouchableOpacity, Image } from "react-native";
import axios from "axios";
import { styles } from "./Styles";
import { Video } from "expo-av";
import FavoriteIcon from "../SocialCloud/FavoriteIcon";
import { Card, Text, Divider, Chip, useTheme, TextInput } from "react-native-paper";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import { useUser } from "../../../Components/Contexts/UserContext";
import { useAPI } from "../../../Components/Contexts/APIContext";
import { useFavorites } from "../../../Components/Contexts/FavoritesContext";


export default function Favorites() {

  const { currentUser } = useUser();
  const { simulatorAPI } = useAPI();
  const theme = useTheme();
  const { favorite, userFavorites } = useFavorites();


  useEffect(() => {
    userFavorites();
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

    axios.put(`${simulatorAPI}/api/FavList/studentId/${currentUser.id}/postId/${postId}`, lowerCaseTags)
      .then((res) => { userFavorites(); })
      .catch((err) => { console.log("RemoveFav " + err); });
  }

  return (
    <ScrollView>
      {favorite.length == 0 && (
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: "bold" }}>NO FAVORITES YET ...</Text>
        </View>
      )}

      {favorite.map((fav) => {
        return (
          <Card style={styles.card}>
            <View
              key={fav.PostId}
              style={{
                backgroundColor: theme.colors.primarySec,
                paddingHorizontal: 5,
                height: 50,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderTopRightRadius: 5,
                borderTopLeftRadius: 5,
              }}
            >
              <IoniconsIcon name="ios-person-circle-sharp" size={25} color="black" >
                {fav.StudentId === currentUser.personalId
                  ? <Text style={styles.username}>Me</Text>
                  : <Text style={styles.username}>{fav.FirstName}{` ${fav.LastName}`}</Text>}
              </IoniconsIcon>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity onPress={() => RemoveFav(fav.PostId, fav.Tags)}>
                  <FavoriteIcon filled={true} />
                </TouchableOpacity>
              </View>
            </View>

            <Divider bold={true} />
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
              <View style={{ flexDirection: "row", flexWrap: "wrap", marginVertical: 2, }}  >
                {fav.Tags.map((f) => (
                  <Chip
                    textStyle={{ color: "white" }}
                    style={{
                      backgroundColor: theme.colors.backdrop,
                      marginHorizontal: 2,
                    }}
                  >
                    {f.TagName}
                  </Chip>
                ))}
              </View>
            </ScrollView>

            <Divider bold={true} />

            <Card.Content>
              {fav.Type === "I"
                ? <Image source={{ uri: fav.FileUrl }} style={styles.image} />
                : <Video
                  source={{ uri: fav.FileUrl }}
                  useNativeControls={true}
                  resizeMode="contain"
                  style={styles.video}
                />
              }
            </Card.Content>

            <Divider bold={true} />
            {fav.Description && <TextInput disabled={true} multiline={true}> {fav.Description}</TextInput>}
            <Divider bold={true} />
          </Card>
        );
      })}
    </ScrollView>
  );
}
