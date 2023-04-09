import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import { Video } from "expo-av";
import { styles } from "./Styles";
import axios from "axios";
import { Card } from "react-native-paper";
import { useUser } from "../../../Components/Contexts/UserContext";

export default function Comments({ route }) {
  const { currentUser } = useUser();
  console.log(currentUser);

  const { post } = route.params;
  const [postComment, setPostComment] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    getComments();
  }, []);

  //get comments
  const getComments = async () => {
    await axios
      .get(`http://10.0.2.2:5283/api/PostsComments/postId/${post.PostId}`)
      .then((res) => {
        setPostComment(res.data);
      })
      .catch((err) => console.log("getComments " + err));
  };

  const handleCommentChange = (text) => {
    setComment(text);
  };

  //add comment
  function addNewComment() {
    const newComment = {
      commentId: 1,
      studentId: currentUser.id,
      postId: post.PostId,
      commentText: comment,
    };

    fetch(`http://10.0.2.2:5283/api/PostsComments`, {
      method: "POST",
      body: JSON.stringify(newComment),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        if (res.ok) {
          Alert.alert("Success", "The comment was added successfully!", [
            {
              text: "OK",
            },
          ]);
        } else {
          Alert.alert("Error", "Comment was failed.");
        }
        getComments();
      })
      .then(
        (res) => {
          console.log("suc in post comment to DB", res);
        },
        (error) => {
          console.log("ERR in post comment to DB", error);
        }
      );
    setComment("");
  }

  //remove comment
  function RemoveComment(commentId) {
    Alert.alert("Wait!", "Are you sure you want to delete this comment?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          axios
            .delete(
              `http://10.0.2.2:5283/api/PostsComments/commentId/${commentId}`
            )
            .then((res) => {
              setPostComment((prevList) =>
                prevList.filter((c) => c.commentId !== commentId)
              );
              getComments();
              console.log("getComments ", JSON.stringify(postComment));
            })

            .catch((err) => {
              console.log("remove comment " + err);
            });
        },
      },
    ]);
  }

  return (
    <ScrollView>
      <Card style={styles.commentCard}>
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
        </View>
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
      </Card>
      {currentUser.type === "Student" && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: 60,
            backgroundColor: "#696969",
            borderRadius: 12,
            marginBottom: 8,
          }}
        >
          <TextInput
            style={{ flex: 1, height: 50 }}
            placeholder="Add a comment..."
            onChangeText={handleCommentChange}
            value={comment}
          />
          <IoniconsIcon name="send" size={20} onPress={() => addNewComment()} />
        </View>
      )}

      <ScrollView>
        {postComment.map((c) => (
          <Card
            key={c.commentId}
            style={{
              height: 50,
              marginTop: 5,
              backgroundColor: "#dcdcdc",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <IoniconsIcon name="ios-person" size={15} color="black">
                <Text style={styles.userNameComment}>
                  {c.FirstName}
                  {` ${c.LastName}`}
                </Text>
              </IoniconsIcon>
              {(currentUser.type === "Teacher" ||
                c.studentId === currentUser.id) && (
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    right: 3,
                    backgroundColor: "black",
                    borderRadius: 15,
                    width: 15,
                    height: 15,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => RemoveComment(c.commentId)}
                >
                  <Text
                    style={{ fontSize: 12, fontWeight: "bold", color: "white" }}
                  >
                    X
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <View>
              <Text
                style={{ fontSize: 12, left:5}}
              >
                {c.commentText}
              </Text>
            </View>
          </Card>
        ))}
      </ScrollView>
    </ScrollView>
  );
}
