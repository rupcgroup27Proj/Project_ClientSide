import { Image, View, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../../../Config";
import axios from "axios";
import { Card, useTheme, Text } from "react-native-paper";
import { styles } from "./Styles";
import Icon from "react-native-vector-icons/Ionicons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

//temporary user for tests
const currentUser = {
  Type: "Student",
  GroupId: 0,
  UserId: 2,
  personalId: 222,
  Password: 222,
  FirstName: "Teacher2",
  LastName: "teacher2",
  Phone: 222,
  Email: "teacher2@gmail.com",
  PictureUrl: null,
  ParentPhone: null,
  IsAdmin: 0,
  StartDate: "01/01/2020",
  EndDate: "02/02/2024",
};

export default function NewPost({ navigation }) {
  const [image, setImage] = useState(null);
  const [allTags, setAllTags] = useState([]);
  const [allSelectedTags, setAllSelectedTags] = useState([]);
  const [mediaType, setMediaType] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    getAllTags();
  }, []);

  //get all tags
  const getAllTags = async () => {
    await axios
      .get(`http://10.0.2.2:5283/api/Tags/groupId/${currentUser.GroupId}`)
      .then((res) => {
        setAllTags(res.data);
      })
      .catch((err) => console.log(err));
  };

  //pick image
  const AddImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (result.type.startsWith("video")) {
        setMediaType("V");
      } else if (result.type.startsWith("image")) {
        setMediaType("I");
      }
      setImage(result.uri);
    }
  };

  //upload image to firebase
  const uploadImage = async () => {
    console.log(image);
    const response = await fetch(image);
    const blob = await response.blob();
    const filename =
      `images/` +
      `${currentUser.personalId}.` +
      `${currentUser.GroupId}.` +
      image.substring(image.lastIndexOf("/") + 1);

    //const filename = image.substring(image.lastIndexOf("/") + 1);
    var ref = firebase.storage().ref().child(filename).put(blob);

    try {
      await ref;
      var imageRef = firebase.storage().ref().child(filename);
      var imageLink = await imageRef.getDownloadURL();

      console.log(`Image ${filename} uploaded successfully`);
    } catch (error) {
      console.log("error in upload to FB", error);
    }

    uploadImagesDB(imageLink);
    setImage(null);
  };

  //upload image to db
  const uploadImagesDB = (imageLink) => {
    const newImage = {
      groupId: currentUser.GroupId,
      studentId: currentUser.UserId,
      teacherId: 1,
      guideId: 1,
      fileUrl: imageLink,
      firstName: currentUser.FirstName,
      LastName: currentUser.LastName,
      type: mediaType,
    };

    if (currentUser.Type == "Teacher") {
      newImage.studentId = 1;
      newImage.teacherId = currentUser.UserId;
      newImage.guideId = 1;
    } else if (currentUser.Type == "Student") {
      newImage.studentId = currentUser.UserId;
      newImage.teacherId = 1;
      newImage.guideId = 1;
    } else if (currentUser.Type == "Guide") {
      newImage.studentId = 1;
      newImage.teacherId = 1;
      newImage.guideId = currentUser.UserId;
    }

    const tagsJson = {
      Tags: [...allSelectedTags],
    };

    fetch(
      `http://10.0.2.2:5283/api/SocialCloud/tagsJson/${JSON.stringify(
        tagsJson
      )}`,
      {
        method: "POST",
        body: JSON.stringify(newImage),
        headers: new Headers({
          "Content-type": "application/json; charset=UTF-8",
          Accept: "application/json; charset=UTF-8",
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          Alert.alert("Success", "Image uploaded successfully", [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("SocialFeed");
              },
            },
          ]);
        } else {
          Alert.alert("Error", "Image upload failed");
        }
        return res.json();
      })
      .then(
        (result) => {
          console.log("suc in post images to DB ", result);
        },
        (error) => {
          console.log("ERR in post images to DB", error);
        }
      );

    setAllSelectedTags([]);
    setImage(null);
  };

  return (
    <>
      {/* <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="New Post" style={styles.title} />
        <Icon
          name="cloud-upload-outline"
          size={30}
          color="black"
          style={{ flex: 2, alignItems: "center", justifyContent: "center" }}
        />
      </Appbar.Header> */}
      <View style={styles.container}>
        <Card style={styles.card2}>
          {!image && (
            <Icon
              name="camera"
              size={40}
              style={{
                top: 128,
                left: 150,
              }}
              onPress={() => AddImage()}
            ></Icon>
          )}

          {image && (
            <View>
              <Image source={{ uri: image }} style={styles.image} />
            </View>
          )}
        </Card>

        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {allTags.map((tag) => (
            <TouchableOpacity
              key={tag.tagId}
              onPress={() =>
                setAllSelectedTags(
                  allSelectedTags.includes(tag)
                    ? allSelectedTags.filter((t) => t.tagId !== tag.tagId)
                    : [...allSelectedTags, tag]
                )
              }
              style={{
                backgroundColor: allSelectedTags.includes(tag)
                  ? theme.colors.tertiary
                  : "#F2F2F2", //Conditional styling
                borderRadius: 16,
                paddingHorizontal: 16,
                paddingVertical: 8,
                margin: 4,
              }}
            >
              <Text>{tag.tagName}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity onPress={() => uploadImage()}>
          <FontAwesome
            name="check-circle"
            size={40}
            style={{ top: 60 }}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </>
  );
}
