import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Text,
  Alert,
} from "react-native";
import axios from "axios";
import { styles } from "./Styles";
import HeartIcon from "./HeartIcon";
import FavoriteIcon from "./FavoriteIcon";
import { Card, FAB } from "react-native-paper";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Video } from "expo-av";
import { useUser } from "../../../Components/Contexts/UserContext";
import { useAPI } from "../../../Components/Contexts/APIContext";

import { StyleSheet } from 'react-native';
import { useFavorites } from "../../../Components/Contexts/FavoritesContext";

export default function SocialFeed({ post, navigation }) {
  const { currentUser } = useUser();
  const { simulatorAPI } = useAPI();
  const { favorite, userFavorites } = useFavorites();

  const [posts, setPosts] = useState([]);
  const [postsLikes, setPostsLikes] = useState([]);

  useEffect(() => {
    getAllPosts();
    userLikes();
    userFavorites();
  }, []);

  //get all images from server
  function getAllPosts() {
    axios
      .get(
        `${simulatorAPI}/api/SocialCloud/groupId/${currentUser.groupId}`
      )
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.log("getAllPosts " + err));
  }

  //get user's likes
  const userLikes = async () => {
    await axios
      .get(
        `${simulatorAPI}/api/PostsLikes/studentId/${currentUser.id}`
      )
      .then((res) => {
        setPostsLikes(res.data);
      })
      .catch((err) => console.log("userLikes " + err));
  };

  //add like
  function AddLike(postId) {
    axios
      .post(
        `${simulatorAPI}/api/PostsLikes/studentId/${currentUser.id}/postId/${postId}`
      )
      .then((res) => {
        userLikes();
      })
      .catch((err) => {
        console.log("AddLike " + err);
      });
  }

  //remove like
  function RemoveLike(postId) {
    axios
      .delete(
        `${simulatorAPI}/api/PostsLikes/studentId/${currentUser.id}/postId/${postId}`
      )
      .then((res) => {
        userLikes();
      })
      .catch((err) => {
        console.log("RemoveLike " + err);
      });
  }

  //add to favs
  function AddFav(postId, Tags) {
    const lowerCaseTags = Tags.map((tag) => {
      const lowerCaseObj = {};
      for (const key in tag) {
        lowerCaseObj[key.charAt(0).toLowerCase() + key.slice(1)] = tag[key];
      }
      return lowerCaseObj;
    });

    axios.post(`${simulatorAPI}/api/FavList/studentId/${currentUser.id}/postId/${postId}`, lowerCaseTags)
      .then((res) => {
        // setFavorite((prevList) => [...prevList, { postId }]);
        userFavorites();
      })
      .catch((err) => {
        console.log("AddFav " + err);
      });
  }

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
      .put(`${simulatorAPI}/api/FavList/studentId/${currentUser.id}/postId/${postId}`, lowerCaseTags)
      .then((res) => {
        // setFavorite((prevList) =>
        //   prevList.filter((fav) => fav.PostId !== postId)
        // );
        userFavorites();
      })

      .catch((err) => {
        console.log("RemoveFav " + err);
      });
  }

  //remove post
  function RemovePost(postId) {
    Alert.alert("Wait!", "Are you sure you want to delete?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          axios
            .delete(`${simulatorAPI}/api/SocialCloud/postId/${postId}`)
            .then((res) => {
              setPosts((prevList) =>
                prevList.filter((p) => p.postId !== postId)
              );
              getAllPosts();
            })
            .catch((err) => {
              console.log("RemovePost " + err);
            });
        },
      },
    ]);
  }

  return (
    <ScrollView style={{ marginTop: 5 }}>
      <FAB
        icon="plus"
        style={{position:"absolute", margin: 16 ,backgroundColor:"red"}}
        onPress={() =>
          navigation.navigate("New Post", { updatePosts: getAllPosts })
        }
      />
      {!posts &&(
        <View>
          <Text>NO POSTS YET ...</Text>
        </View>
      )}
      {posts.map((post) => (
        <Card style={styles.card}>
          <View
            key={post.PostId}
            style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}
          >
            <IoniconsIcon name="ios-person" size={23} color="black">
              <Text style={styles.username}>
                {post.FirstName}
                {` ${post.LastName}`}
              </Text>
            </IoniconsIcon>
            {(currentUser.type === "Teacher" ||
              post.StudentId === currentUser.personalId) && (
              <TouchableOpacity
                style={{ left: 220 }}
                onPress={() => RemovePost(post.PostId)}
              >
                <IoniconsIcon name="trash-outline" size={20} color="black" />
              </TouchableOpacity>
            )}
          </View>

          <ScrollView horizontal={true}>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {post.Tags.map((t) => (
                <TouchableOpacity
                  key={t.TagId}
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
                    {t.TagName}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <Card.Content>
            {post.Type === "I" ? (
              <Image source={{ uri: post.FileUrl }} style={styles.image} />
            ) : (
              <Video
                source={{ uri: post.FileUrl }}
                useNativeControls={true}
                resizeMode="contain"
                style={styles.video}
              />
            )}
          </Card.Content>
          <View
            style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}
          >
            {postsLikes.some((like) => like.postId === post.PostId) &&
              currentUser.type === "Student" && (
                <TouchableOpacity
                  style={{ left: 12 }}
                  onPress={() => RemoveLike(post.PostId)}
                >
                  <HeartIcon filled={true} />
                </TouchableOpacity>
              )}
            {!postsLikes.some((like) => like.postId === post.PostId) &&
              currentUser.type === "Student" && (
                <TouchableOpacity
                  style={{ left: 12 }}
                  onPress={() => AddLike(post.PostId)}
                >
                  <HeartIcon filled={false} />
                </TouchableOpacity>
              )}
            {
              <TouchableOpacity
                onPress={() => navigation.navigate("Comments", { post: post })}
              >
                <FontAwesomeIcon
                  name="comment-o"
                  size={20}
                  color="black"
                  style={{
                    left: 23,
                    bottom: 3,
                  }}
                />
              </TouchableOpacity>
            }
            {favorite.some((fav) => fav.PostId === post.PostId) &&
              currentUser.type === "Student" && (
                <TouchableOpacity
                  style={{ left: 320 }}
                  onPress={() => RemoveFav(post.PostId, post.Tags)}
                >
                  <FavoriteIcon filled={true} />
                </TouchableOpacity>
              )}
            {!favorite.some((fav) => fav.PostId === post.PostId) &&
              currentUser.type === "Student" && (
                <TouchableOpacity
                  style={{ left: 320 }}
                  onPress={() => AddFav(post.PostId, post.Tags)}
                >
                  <FavoriteIcon filled={false} />
                </TouchableOpacity>
              )}
          </View>
        </Card>
      ))}
    </ScrollView>
  );
}
