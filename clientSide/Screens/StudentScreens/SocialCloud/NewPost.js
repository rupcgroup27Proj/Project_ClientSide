import { View, Image } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";
import { Styles } from "./Styles";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../../../Config";

const ApiUrl_Image = "http://10.0.2.2:5283/api/SocialCloud";
//const ApiUrl_Image="https://localhost:7283/api/SocialCloud";

//temporary user for tests
const currentUser = {
  Type: "Teacher",
  GroupId: 2,
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

  //pick image
  const AddImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
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
    //navigation.navigate("SocialFeed");
  };

  //upload image to db
  const uploadImagesDB = (imageLink) => {
    const newImage = {
      groupId: currentUser.GroupId,
      studentId: 1,
      teacherId: 1,
      guideId: 1,
      fileUrl: imageLink,
      type: "I",
    };

    if (currentUser.Type == "Teacher") {
      newImage.studentId = 1;
      newImage.teacherId = currentUser.UserId;
      newImage.guideId = 1;
    } else if (currentUser.Type == "Student") {
      newImage.studentId = currentUser.UserId;
      newImage.teacherId = 1;
      newImage.guideId = 1;
    }else if(currentUser.Type == "Guide"){
      newImage.studentId = 1;
      newImage.teacherId = 1;
      newImage.guideId = 1;
    }

    // } else if (currentUser.Type == "Student") {
    //   const newImage = {
    //     groupId: currentUser.GroupId,
    //     studentId: currentUser.personalId,
    //     teacherId: null,
    //     guideId: null,
    //     fileUrl: imageLink,
    //     type: "I",
    //   };
    // }

    fetch(ApiUrl_Image, {
      // method: "POST",
      // body: JSON.stringify(newImage),
      // headers: new Headers({
      //   "Content-type": "application/json; charset=UTF-8",
      //   Accept: "application/json; charset=UTF-8",
      // }),

      method: "POST",
      body: newImage,
    })
      .then((res) => {
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
  };

  return (
    <>
      <View style={Styles.newPostContainer}>
        <Button
          title="AddImage"
          style={{
            backgroundColor: "#000",
            marginTop: 50,
            marginLeft: 85,
            marginRight: 85,
          }}
          onPress={() => AddImage()}
          icon="camera"
          mode="contained"
        >
          Add Image
        </Button>
        <Button
          title="uploadImage"
          style={{
            backgroundColor: "#000",
            marginTop: 10,
            marginLeft: 85,
            marginRight: 85,
          }}
          onPress={() => uploadImage()}
          icon="upload"
          mode="contained"
        >
          Upload Image
        </Button>
        {image && (
          <View>
            <Image source={{ uri: image }} style={Styles.newPostImage} />
          </View>
        )}
      </View>
    </>
  );
}
