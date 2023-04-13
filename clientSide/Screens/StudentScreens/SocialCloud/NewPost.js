import { Image, View, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../../../Config";
import axios from "axios";
import {
  useTheme,
  Text,
  Button,
  Divider,
  TextInput,
  Chip,
} from "react-native-paper";
import { styles } from "./Styles";
import Icon from "react-native-vector-icons/Ionicons";
import { useUser } from "../../../Components/Contexts/UserContext";
import { ScrollView } from "react-native-gesture-handler";
import { useAPI } from "../../../Components/Contexts/APIContext";

export default function NewPost({ navigation, route }) {
  const { currentUser } = useUser();
  const { updatePosts } = route.params;
  const [image, setImage] = useState(null);
  const [allTags, setAllTags] = useState([]);
  const [allSelectedTags, setAllSelectedTags] = useState([]);
  const [mediaType, setMediaType] = useState(null);
  const [description, setDescription] = useState("");
  const { simulatorAPI } = useAPI();
  const theme = useTheme();

  useEffect(() => {
    getAllTags();
  }, []);

  //get all tags
  const getAllTags = async () => {
    await axios
      .get(`${simulatorAPI}/api/Tags/groupId/${currentUser.groupId}`)
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
    if (image === null) {
      Alert.alert("Error", "Choose something to upload.");
    } else if (allSelectedTags.length === 0) {
      Alert.alert("Error", "Choose Tags pls.");
    } else {
      const response = await fetch(image);
      const blob = await response.blob();
      const filename =
        `images/` +
        `${currentUser.id}.` +
        `${currentUser.groupId}.` +
        image.substring(image.lastIndexOf("/") + 1);
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
    }
  };

  //upload image to db
  const uploadImagesDB = (imageLink) => {
    const newImage = {
      groupId: currentUser.groupId,
      studentId: currentUser.id,
      teacherId: 1,
      guideId: 1,
      fileUrl: imageLink,
      firstName: currentUser.firstName,
      LastName: currentUser.lastName,
      type: mediaType,
      likes: 0,
      comments: 0,
      description: description,
    };

    if (currentUser.type == "Teacher") {
      newImage.studentId = 1;
      newImage.teacherId = currentUser.id;
      newImage.guideId = 1;
    } else if (currentUser.type == "Student") {
      newImage.studentId = currentUser.id;
      newImage.teacherId = 1;
      newImage.guideId = 1;
    } else if (currentUser.type == "Guide") {
      newImage.studentId = 1;
      newImage.teacherId = 1;
      newImage.guideId = currentUser.id;
    }

    const tagsJson = {
      Tags: [...allSelectedTags],
    };

    fetch(
      `${simulatorAPI}/api/SocialCloud/tagsJson/${JSON.stringify(tagsJson)}`,
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
          Alert.alert("Success", "uploaded successfully!", [
            {
              text: "OK",
              onPress: () => {
                updatePosts();
                navigation.navigate("Social Feed");
              },
            },
          ]);
        } else {
          Alert.alert("Error", "upload failed.");
        }
      })
      .then(
        (res) => {
          console.log("suc in post images to DB", res);
        },
        (error) => {
          console.log("ERR in post images to DB", error);
        }
      );

    setAllSelectedTags([]);
    setImage(null);
    setDescription("");
  };

  return (
    <ScrollView>
      <View style={styles.uploadcard}>
        {!image && (
          <Icon
            name="camera"
            size={25}
            style={{
              justifyContent: "center",
              alignSelf: "center",
            }}
            onPress={() => AddImage()}
          ></Icon>
        )}
        {image && (
          <View>
            <Image
              source={{ uri: image }}
              style={{ height: 300, width: '100%' }}
            />
          </View>
        )}
      </View>



      <View>
        <Text style={{ paddingLeft: 5 }}>Tags:</Text>
        <Divider bold={true} />
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginVertical: 2,
            }}
          >
            {allTags.map((tag) => (
              <Chip
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
                    ? theme.colors.primary
                    : theme.colors.secondary,
                  marginHorizontal: 2, marginVertical: 2
                }}
              >
                <Text>{tag.tagName}</Text>
              </Chip>
            ))}
          </View>
        </ScrollView>

        <Divider bold={true} />

        <TextInput
          placeholder="Write a description..."
          value={description}
          onChangeText={(text) => setDescription(text)}
          style={{
            flex: 1,
            height: 50,
            marginHorizontal: 5,
            borderCurve: 10,
            backgroundColor: "white",
            marginTop: 15,
          }}
          mode="flat"
        ></TextInput>
      </View>



      <TouchableOpacity
        style={{ marginTop: 75, marginHorizontal: 80 }}
        onPress={() => uploadImage()}
      >
        <Button
          icon="cloud-upload-outline"
          mode="contained"
          style={{ backgroundColor: theme.colors.primary }}
        >
          Upload
        </Button>
      </TouchableOpacity>
    </ScrollView>
  );
}
