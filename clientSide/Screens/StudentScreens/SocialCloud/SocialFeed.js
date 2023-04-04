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
//import { useUser } from "../../../Components/Contexts/UserContext";

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

export default function SocialFeed({ post, navigation }) {
  //const {currentUser}=useUser();
  const [posts, setPosts] = useState([]);
  //const [postsTags, setPostsTags] = useState([]);
  const [postsLikes, setPostsLikes] = useState([]);
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    getAllPosts();
    //postTags();
    userLikes();
    userFavorites();
  }, []);

  //get all images from server
  function getAllPosts() {
    axios
      .get(
        `http://10.0.2.2:5283/api/SocialCloud/groupId/${currentUser.GroupId}`
      )
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.log("getAllPosts " + err));
  }

  //get post's tags
  // function postTags() {
  //   axios
  //     .get(`http://10.0.2.2:5283/api/SocialCloud/groupId/${currentUser.GroupId}`)
  //     .then((res) => {
  //       setPostsTags(res.data);
  //       //console.log("postTags"+res.data);
  //     })
  //     .catch((err) => console.log("postTags " + err));
  // }

  //get user's likes
  const userLikes = async () => {
    await axios
      .get(
        `http://10.0.2.2:5283/api/PostsLikes/studentId/${currentUser.UserId}`
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
        `http://10.0.2.2:5283/api/PostsLikes/studentId/${currentUser.UserId}/postId/${postId}`
      )
      .then((res) => {
        setPostsLikes((prevList) => [...prevList, { postId : postId}]);
        userLikes();
        //console.log("postsLikes ", JSON.stringify(postsLikes));
      })
      .catch((err) => {
        console.log("AddLike " + err);
      });
  }

  //remove like
  function RemoveLike(postId) {
    axios
      .delete(
        `http://10.0.2.2:5283/api/PostsLikes/studentId/${currentUser.UserId}/postId/${postId}`
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
      .get(`http://10.0.2.2:5283/api/FavList/studentId/${currentUser.UserId}`)
      .then((res) => {
        setFavorite(res.data);
      })
      .catch((err) => console.log("userFavorites " + err));
  };

  //add to favs
  function AddFav(postId) {
    axios
      .post(
        `http://10.0.2.2:5283/api/FavList/studentId/${currentUser.UserId}/postId/${postId}`
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
      {currentUser.Type === "Student" && (
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
            onPress={() => navigation.navigate("NewPost")}
          />
        </TouchableOpacity>
      )}

      {posts.map((post) => (
        <Card style={styles.card}>
          {console.log(post)}

          <View key={post.PostId}>
            <IoniconsIcon name="ios-person" size={30} color="black">
              <Text style={styles.username}>{post.FirstName}</Text>
            </IoniconsIcon>
          </View>
          <Image source={{ uri: post.FileUrl }} style={styles.image}></Image>
          <View>
            {(currentUser.Type === "Teacher" ||
              post.StudentId === currentUser.PersonalId) && (
              <TouchableOpacity
                style={{ left: 360, bottom: 308 }}
                onPress={() => RemovePost(post.PostId)}
              >
                <IoniconsIcon name="trash-outline" size={20} color="black" />
              </TouchableOpacity>
            )}
            {postsLikes.some((like) => like.postId === post.PostId) &&
              currentUser.Type === "Student" && (
                <TouchableOpacity
                  style={{ left: 12, bottom: 5 }}
                  onPress={() => RemoveLike(post.PostId)}
                >
                  <HeartIcon filled={true} />
                </TouchableOpacity>
              )}
            {!postsLikes.some((like) => like.postId === post.PostId) &&
              currentUser.Type === "Student" && (
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
              currentUser.Type === "Student" && (
                <TouchableOpacity
                  style={{ left: 360, bottom: 45 }}
                  onPress={() => RemoveFav(post.PostId)}
                >
                  <FavoriteIcon filled={true} />
                </TouchableOpacity>
              )}
            {!favorite.some((fav) => fav.postId === post.PostId) &&
              currentUser.Type === "Student" && (
                <TouchableOpacity
                  style={{ left: 360, bottom: 45 }}
                  onPress={() => AddFav(post.PostId)}
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
