import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import { styles } from "./Styles";
import axios from "axios";
import { Card } from "react-native-paper";
import { useUser } from "../../../Components/Contexts/UserContext";
import { useAPI } from "../../../Components/Contexts/APIContext";


export default function Comments({ route }) {
  const { currentUser } = useUser();
  const { simulatorAPI } = useAPI();
  const { post } = route.params;
  const [postComment, setPostComment] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    getComments();
  }, []);

  //get comments
  const getComments = async () => {
    await axios
      .get(`${simulatorAPI}/api/PostsComments/postId/${post.PostId}`)
      .then((res) => {
        setPostComment(res.data);
        //console.log("getComments " + JSON.stringify(postComment));
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
      studentId: currentUser.personalId,
      postId: post.PostId,
      commentText: comment,
    };

    fetch(`${simulatorAPI}/api/PostsComments`, {
      method: "POST",
      body: JSON.stringify(newComment),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        if (res.ok) {
          Alert.alert("Success", "The comment was added successfully", [
            {
              text: "OK",
            },
          ]);
        } else {
          Alert.alert("Error", "Comment was failed");
        }
        //return res.json();
        getComments();
      })
      .then(
        (res) => {
          console.log("suc in post comment to DB ", res);
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
              `${simulatorAPI}/api/PostsComments/commentId/${commentId}`
            )
            .then((res) => {
              // setPostComment((prevList) =>
              //   prevList.filter((c) => c.commentId !== commentId)
              // );
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
      <Card style={styles.card}>
        <IoniconsIcon name="ios-person" size={25} color="black">
          <Text style={styles.username}>{post.PostId}</Text>
        </IoniconsIcon>
        <View style={{ height: 240, width: "100%" }}>
          <Image
            source={{ uri: post.FileUrl }}
            style={{ flex: 1, marginTop: 10 }}
          />
        </View>
        {currentUser.type === "Student" && (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              style={{ flex: 1, height: 50 }}
              placeholder="Add a comment..."
              onChangeText={handleCommentChange}
              value={comment}
            />
            <IoniconsIcon
              name="send"
              size={20}
              onPress={() => addNewComment()}
            />
          </View>
        )}

        <ScrollView style={{ marginTop: 10 }}>
          {postComment.map((c) => (
            <Card
              key={c.commentId}
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: 50,
                marginTop: 15,
                backgroundColor: "gray",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View>
                  <IoniconsIcon name="ios-person" size={25} color="black" />
                </View>
                <View>
                  <Text style={styles.username}>{c.studentId}</Text>
                  <Text>{c.commentText}</Text>
                </View>
                <View>
                  {(currentUser.type === "Teacher" ||
                    c.studentId === currentUser.personalId) && (
                      <TouchableOpacity
                        onPress={() => RemoveComment(c.commentId)}
                      >
                        <IoniconsIcon
                          name="trash-outline"
                          size={20}
                          color="black"
                        />
                      </TouchableOpacity>
                    )}
                </View>
              </View>
            </Card>
          ))}
        </ScrollView>
      </Card>
    </ScrollView>
  );
}
