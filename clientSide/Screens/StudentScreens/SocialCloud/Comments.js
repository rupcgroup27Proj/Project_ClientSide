import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import { Video } from "expo-av";
import { styles } from "./Styles";
import axios from "axios";
import {
  Card,
  Divider,
  IconButton,
  TextInput,
  useTheme,
  Chip,
} from "react-native-paper";
import { useUser } from "../../../Components/Contexts/UserContext";
import { useAPI } from "../../../Components/Contexts/APIContext";
import { useNavigation } from "@react-navigation/native";

export default function Comments({ route }) {
  const navigation = useNavigation();
  const { currentUser } = useUser();
  const { simulatorAPI } = useAPI();
  const theme = useTheme();
  const { post, updatePosts } = route.params;
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
      })
      .catch((err) => console.log("getComments " + err));
  };

  const handleCommentChange = (text) => {
    setComment(text);
  };

  //add comment
  function addNewComment(commentText) {
    console.log(commentText)
    if (commentText == undefined || commentText == "") {
      Alert.alert('Error', `Can't send an empty comment!`)
      return;
    }

    const newComment = {
      commentId: 1,
      studentId: currentUser.id,
      postId: post.PostId,
      commentText: comment,
      createdAt: "2023-04-10T20:37:23.145Z",
      firstName: "a",
      lastName: "a",
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
          Alert.alert("Success", "The comment was added successfully!", [
            {
              text: "OK",
            },
          ]);
        } else {
          Alert.alert("Error", "Comment was failed.");
        }
        getComments();
        updatePosts();
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
            .delete(`${simulatorAPI}/api/PostsComments/commentId/${commentId}`)
            .then((res) => {
              setPostComment((prevList) =>
                prevList.filter((c) => c.commentId !== commentId)
              );
              getComments();
              updatePosts();
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
      <Text style={{ marginHorizontal: 10, color: '#2196F3', fontWeight: 'bold' }} onPress={() => navigation.navigate('Social Feed')}>{`<back`}</Text>
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
          <IoniconsIcon name="ios-person-circle-sharp" size={25} color="black">
            {post.StudentId === currentUser.personalId ? (
              <Text style={styles.username}>Me</Text>
            ) : (
              <Text style={styles.username}>
                {post.FirstName}
                {` ${post.LastName}`}
              </Text>
            )}
          </IoniconsIcon>
        </View>

        <Divider bold={true} />
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
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
                #{t.TagName}
              </Chip>
            ))}
          </View>
        </ScrollView>
        <Divider bold={true} />

        <View>
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
        </View>

        <Divider bold={true} />
        {post.Description && (
          <TextInput disabled={true} multiline={true}>
            {post.Description}
          </TextInput>
        )}
        <Divider bold={true} />
      </Card>

      {currentUser.type === "Student" && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: 60,
            borderRadius: 12,
            marginBottom: 8,
          }}
        >
          <TextInput
            style={{
              flex: 1,
              height: 50,
              marginHorizontal: 5,
              borderCurve: 10,
              backgroundColor: "white",
            }}
            placeholder="Add a comment..."
            onChangeText={handleCommentChange}
            value={comment}
            mode="flat"
          />
          <IoniconsIcon name="send" size={20} onPress={() => addNewComment(comment)} />
        </View>
      )}

      <ScrollView>
        {postComment.map((c) => (
          <Card
            key={c.commentId}
            style={{
              marginVertical: 5,
              marginHorizontal: 10,
              backgroundColor: theme.colors.accent,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ flex: 7 }}>
                <View
                  style={{
                    backgroundColor: theme.colors.primarySec,
                    paddingVertical: 5,
                    paddingLeft: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: theme.colors.primary,
                  }}
                >
                  <IoniconsIcon
                    name="ios-person-circle-sharp"
                    size={15}
                    color="black"
                  >
                    <Text style={styles.userNameComment}> {`${c.firstName} ${c.lastName}`} </Text>
                  </IoniconsIcon>
                </View>
                <View style={{ paddingVertical: 10, paddingLeft: 10 }}>
                  <Text style={{ fontSize: 12 }}>{c.commentText}</Text>
                </View>
              </View>
              <View
                style={{
                  borderLeftWidth: 2,
                  borderLeftColor: theme.colors.primary,
                  justifyContent: "center",
                }}
              >
                {(currentUser.type === "Teacher" ||
                  c.studentId === currentUser.id) && (
                    <IconButton
                      icon="delete"
                      size={17}
                      onPress={() => RemoveComment(c.commentId)}
                    ></IconButton>
                  )}
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>
    </ScrollView>
  );
}
