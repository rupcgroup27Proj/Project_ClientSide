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
import {
  Card,
  Chip,
  Divider,
  FAB,
  IconButton,
  TextInput,
  useTheme,
} from "react-native-paper";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Video } from "expo-av";
import { useUser } from "../../../Components/Contexts/UserContext";
import { useAPI } from "../../../Components/Contexts/APIContext";
import { useFavorites } from "../../../Components/Contexts/FavoritesContext";

export default function SocialFeed({ post, navigation }) {
  const { currentUser } = useUser();
  const { simulatorAPI } = useAPI();
  const { favorite, userFavorites } = useFavorites();
  const theme = useTheme();

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
      .get(`${simulatorAPI}/api/SocialCloud/groupId/${currentUser.groupId}`)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.log("getAllPosts " + err));
  }

  //get user's likes
  const userLikes = async () => {
    await axios
      .get(`${simulatorAPI}/api/PostsLikes/studentId/${currentUser.id}`)
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

    axios
      .post(
        `${simulatorAPI}/api/FavList/studentId/${currentUser.id}/postId/${postId}`,
        lowerCaseTags
      )
      .then((res) => {
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
      .put(
        `${simulatorAPI}/api/FavList/studentId/${currentUser.id}/postId/${postId}`,
        lowerCaseTags
      )
      .then((res) => {
        userFavorites();
      })
      .catch((err) => {
        console.log("RemoveFav " + err);
      });
  }

  //remove post
  function RemovePost(postId) {
    Alert.alert("Wait!", "Are you sure you want to delete?", [
      { text: "Cancel", style: "cancel" },
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
    <>
      <ScrollView>
        {!posts && (
          <View>
            <Text>NO POSTS YET ...</Text>
          </View>
        )}

        {posts.map((post) => {
          const isStudent = currentUser.type === "Student";
          const isPostLiked = postsLikes.some(
            (like) => like.postId === post.PostId
          );
          const isPostFavorited = favorite.some(
            (fav) => fav.PostId === post.PostId
          );

          return (
            <Card style={styles.card}>
              <View
                key={post.PostId}
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
                <IoniconsIcon
                  name="ios-person-circle-sharp"
                  size={25}
                  color="black"
                >
                  {post.StudentId === currentUser.personalId ? (
                    <Text style={styles.username}>Me</Text>
                  ) : (
                    <Text style={styles.username}>
                      {post.FirstName}
                      {` ${post.LastName}`}
                    </Text>
                  )}
                </IoniconsIcon>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {isStudent && (
                    <TouchableOpacity
                      onPress={() => {
                        isPostFavorited
                          ? RemoveFav(post.PostId, post.Tags)
                          : AddFav(post.PostId, post.Tags);
                      }}
                    >
                      <FavoriteIcon filled={isPostFavorited} />
                    </TouchableOpacity>
                  )}
                  {(currentUser.type === "Teacher" ||
                    post.StudentId === currentUser.personalId) && (
                      <IconButton
                        icon="delete"
                        size={20}
                        onPress={() => RemovePost(post.PostId)}
                      />
                    )}
                </View>
              </View>

              <Divider bold={true} />
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    marginVertical: 2,
                  }}
                >
                  {post.Tags.map((t) => (
                    <Chip
                      textStyle={{ color: "white" }}
                      style={{
                        backgroundColor: theme.colors.backdrop,
                        marginHorizontal: 2,
                      }}
                    >
                      {t.TagName}
                    </Chip>
                  ))}
                </View>
              </ScrollView>
              <Divider bold={true} />

              <View>
                <Card.Content>
                  {post.Type === "I" ? (
                    <Image
                      source={{ uri: post.FileUrl }}
                      style={styles.image}
                    />
                  ) : (
                    <Video
                      source={{ uri: post.FileUrl }}
                      useNativeControls={true}
                      resizeMode="contain"
                      style={styles.video}
                      volume={0}
                    />
                  )}
                </Card.Content>
              </View>
              <Divider bold={true} />

              <TextInput disabled={true} multiline={true}>{post.Description ? post.Description : "No description."}</TextInput>

              <Divider bold={true} />
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginVertical: 10,
                }}
              >
                {isStudent && (
                  <TouchableOpacity
                    style={{ left: 12 }}
                    onPress={() => {
                      isPostLiked
                        ? RemoveLike(post.PostId)
                        : AddLike(post.PostId);
                    }}
                  >
                    <HeartIcon filled={isPostLiked} />
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Comments", { post: post })
                  }
                >
                  <FontAwesomeIcon
                    name="comment-o"
                    size={20}
                    color="black"
                    style={{ left: 23, bottom: 3 }}
                  />
                </TouchableOpacity>
              </View>
            </Card>
          );
        })}
      </ScrollView>

      <FAB
        icon="cloud-upload"
        color={theme.colors.accent}
        small
        onPress={() =>
          navigation.navigate("New Post", { updatePosts: getAllPosts })
        }
        style={{
          position: "absolute",
          margin: 15,
          right: 0,
          bottom: 0,
          backgroundColor: theme.colors.primary,
        }}
      />
    </>
  );
}
