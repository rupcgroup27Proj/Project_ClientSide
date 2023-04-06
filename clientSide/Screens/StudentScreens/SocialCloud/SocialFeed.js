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
import { Card, Appbar, Button } from "react-native-paper";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Video, AVPlaybackStatus } from "expo-av";
import { useUser } from "../../../Components/Contexts/UserContext";

export default function SocialFeed({ post, navigation }) {
  const { currentUser } = useUser();
  console.log(currentUser);

  const [posts, setPosts] = useState([]);
  const [postsLikes, setPostsLikes] = useState([]);
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    getAllPosts();
    userLikes();
    userFavorites();
  }, []);

  //get all images from server /////////////////////////////////////////////////////////////////////////////////////////////////////////
  function getAllPosts() {
    axios
      .get(
        `http://10.0.2.2:5283/api/SocialCloud/groupId/${currentUser.groupId}`
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
        `http://10.0.2.2:5283/api/PostsLikes/studentId/${currentUser.personalId}`
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
        `http://10.0.2.2:5283/api/PostsLikes/studentId/${currentUser.personalId}/postId/${postId}`
      )
      .then((res) => {
        setPostsLikes((prevList) => [...prevList, { postId: postId }]);
        userLikes();
        console.log("postsLikes ", JSON.stringify(postsLikes));
      })
      .catch((err) => {
        console.log("AddLike " + err);
      });
  }

  //remove like
  function RemoveLike(postId) {
    axios
      .delete(
        `http://10.0.2.2:5283/api/PostsLikes/studentId/${currentUser.personalId}/postId/${postId}`
      )
      .then((res) => {
        setPostsLikes((prevList) =>
          prevList.filter((like) => like.postId !== postId)
        );
        userLikes();
        //console.log("postsLikes ", JSON.stringify(postsLikes));
      })
      .catch((err) => {
        console.log("RemoveLike " + err);
      });
  }

  //get user's favs
  const userFavorites = async () => {
    await axios
      .get(
        `http://10.0.2.2:5283/api/FavList/studentId/${currentUser.personalId}`
      )
      .then((res) => {
        setFavorite(res.data);
      })
      .catch((err) => console.log("userFavorites " + err));
  };

  //add to favs
  function AddFav(postId) {
    axios
      .post(
        `http://10.0.2.2:5283/api/FavList/studentId/${currentUser.personalId}/postId/${postId}`
      )
      .then((res) => {
        setFavorite((prevList) => [...prevList, { postId }]);
        userFavorites();
        //console.log("userFavorites ", JSON.stringify(favorite));
      })
      .catch((err) => {
        console.log("AddFav " + err);
      });
  }

  //remove from favs
  function RemoveFav(postId) {
    axios
      .delete(
        `http://10.0.2.2:5283/api/FavList/studentId/${currentUser.personalId}/postId/${postId}`
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

  //remove post
  function RemovePost(postId) {
    axios
      .delete(`http://10.0.2.2:5283/api/SocialCloud/postId/${postId}`)
      .then((res) => {
        setPosts((prevList) => prevList.filter((p) => p.postId !== postId));
        getAllPosts();
      })
      .catch((err) => {
        console.log("RemovePost " + err);
      });
  }

  return (
    <ScrollView style={{ marginTop: 25 }}>
      {/* <IoniconsIcon name="cloud" size={30} color="black"></IoniconsIcon> */}
      {currentUser.type === "Student" && (
        <TouchableOpacity>
          <IoniconsIcon
            name="add"
            size={25}
            color="white"
            style={{
              borderRadius: 20,
              backgroundColor: "black",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() =>
              navigation.navigate("New Post", { updatePosts: getAllPosts })
            }
          />
        </TouchableOpacity>
      )}

      {posts.map((post) => (
        <Card style={styles.card}>
          <View key={post.PostId}>
            <IoniconsIcon name="ios-person" size={30} color="black">
              <Text style={styles.username}>{post.FirstName}</Text>
            </IoniconsIcon>
          </View>
          {post.Type === "I" ? (
            <Image source={{ uri: post.FileUrl }} style={styles.image} />
          ) : (
            <Video
              source={{ uri: post.FileUrl }}
              useNativeControls={true}
              resizeMode="contain"
              styles={{ width: 200, height: 200 }}
            />
          )}
          <View>
            {(currentUser.type === "Teacher" ||
              post.StudentId === currentUser.personalId) && (
              <TouchableOpacity
                style={{ left: 360, bottom: 308 }}
                onPress={() => RemovePost(post.PostId)}
              >
                <IoniconsIcon name="trash-outline" size={20} color="black" />
              </TouchableOpacity>
            )}
            {postsLikes.some((like) => like.postId === post.PostId) &&
              currentUser.type === "Student" && (
                <TouchableOpacity
                  style={{ left: 12, bottom: 5 }}
                  onPress={() => RemoveLike(post.PostId)}
                >
                  <HeartIcon filled={true} />
                </TouchableOpacity>
              )}
            {!postsLikes.some((like) => like.postId === post.PostId) &&
              currentUser.type === "Student" && (
                <TouchableOpacity
                  style={{ left: 12, bottom: 5 }}
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
                    left: 45,
                    bottom: 25,
                  }}
                />
              </TouchableOpacity>
            }
            {favorite.some((fav) => fav.postId === post.PostId) &&
              currentUser.type === "Student" && (
                <TouchableOpacity
                  style={{ left: 360, bottom: 45 }}
                  onPress={() => RemoveFav(post.PostId)}
                >
                  <FavoriteIcon filled={true} />
                </TouchableOpacity>
              )}
            {!favorite.some((fav) => fav.postId === post.PostId) &&
              currentUser.type === "Student" && (
                <TouchableOpacity
                  style={{ left: 360, bottom: 45 }}
                  onPress={() => AddFav(post.PostId)}
                >
                  <FavoriteIcon filled={false} />
                </TouchableOpacity>
              )}
            {post.Tags.map((t) => (
              <TouchableOpacity
                key={t.TagId}
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
                  {t.TagName}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>
      ))}
    </ScrollView>
  );
}
