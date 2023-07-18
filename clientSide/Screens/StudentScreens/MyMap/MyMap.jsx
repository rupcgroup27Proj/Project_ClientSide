import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Alert, Image, ScrollView, Dimensions, Text, Keyboard, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import * as Location from 'expo-location';
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from '@expo/vector-icons';
import { Card, IconButton, Button, Avatar, useTheme, TextInput } from 'react-native-paper';
import { useTeacher } from '../../../Components/Contexts/TeacherContext';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useAPI } from '../../../Components/Contexts/APIContext';
import { useUser } from '../../../Components/Contexts/UserContext';
import Swiper from 'react-native-swiper';

const MyMap = () => {
  const dumim = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEWJz/C4QSRIAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII=';
  const { currentUser } = useUser();
  const { simulatorAPI } = useAPI();
  const { startDate } = useTeacher();
  const { height } = Dimensions.get('window');
  const d = new Date(startDate)
  const formattedDate = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  const theme = useTheme();
  const [inAddLoc, setInAddLoc] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  //Search location
  const mapViewRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locName, setLocName] = useState('')
  const [canChooseLoc, setCanChooseLoc] = useState(false);
  const [map, setMap] = useState([]);
  //image uplaoding
  const [inEdit, setInEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [editLoc, setEditLoc] = useState()
  //images view
  const [inImageView, setInImageView] = useState(false);
  const [mComp, setMComp] = useState(0);

  useEffect(() => {
    //Get user's current location
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission denied',
          'You need to grant location permission to use this feature.',
          [{ text: 'OK' }]
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    };
    getLocation();
    getStudentMap();
  }, []);


  //Get the student's map
  const getStudentMap = () => {
    axios.get(`${simulatorAPI}/api/Maps/studentId/${currentUser.id}`)
      .then((res) => { setMap(res.data) })
      .catch((err) => Alert.alert('Error', 'Could not get your map.'));
  }


  //Create the marker with one of it's images.
  const renderCustomMarker = (image) => (
    <View style={styles.customMarkerContainer}>
      <View style={styles.customMarker}>
        <Image
          source={{ uri: image == null ? dumim : image }}
          style={styles.markerImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.customMarkerCircle} />
    </View>
  );


  //Search a location
  const handleSearchSelect = async (data, details) => {
    const { lat, lng } = details.geometry.location;
    const selectedLocation = { latitude: lat, longitude: lng };

    await mapViewRef.current.animateToRegion({
      ...selectedLocation,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    });

    if (!canChooseLoc)
      setCanChooseLoc(prev => !prev);
    setLocName(data.description);
    setSelectedLocation(selectedLocation);
  };


  const handleChooseLocation = () => {
    axios.post(`${simulatorAPI}/api/Maps/studentId/${currentUser.id}/lon/${selectedLocation.longitude}/lat/${selectedLocation.latitude}/name/${locName}`)
      .then((res) => { getStudentMap(); })
      .catch((err) => Alert.alert('Error', 'Could not add this location.'));
    handleCancelLocation()
  }

  const handleCancelLocation = () => {
    if (canChooseLoc)
      setCanChooseLoc(prev => !prev);
    Keyboard.dismiss();
    // Some strange error regarding order or rendering with keyboard on, wait for it to dismiss solves the problem.
    setTimeout(() => setInAddLoc(prev => !prev), 10);
  }


  const handleDelete = (comp) => {
    Alert.alert(
      'Title',
      `Are you sure you want to delete this location and all it's data?`,
      [
        { text: 'Cancel', style: 'cancel', onPress: () => { return } },
        {
          text: 'OK',
          onPress: () => {
            axios.delete(`${simulatorAPI}/api/Maps/locationId/${comp.locationId}/filesUrl/${comp.files.map(file => file.fileUrl)}`)
              .then((res) => { getStudentMap(); })
              .catch((err) => Alert.alert('Error', 'Could not delete the location.'));
          },
        },
      ], { cancelable: false }
    );


  }

  //image picking:
  const handleEdit = (locationId) => {
    setEditLoc(locationId);
    setInEdit(prev => !prev)
  }

  const cancelUpload = () => {
    setImage(null);
    setDescription('');
    Keyboard.dismiss();
    // Some strange error regarding order or rendering with keyboard on, wait for it to dismiss solves the problem.
    setTimeout(() => handleEdit(0), 10);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('error', 'Permission denied');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission denied');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async () => {
    const formData = new FormData();
    const files = [image];
    let desc = 'empty';
    if (description !== '')
      desc = description

    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append('files', {
          uri: files[i],
          type: 'image/jpeg',
          name: 'image.jpg',
        });
      }
    }

    formData.append('description', desc);

    try {
      const response = await axios.post(`${simulatorAPI}/api/Maps/studentId/${currentUser.id}/locationId/${editLoc}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload successful:', response.data);
      cancelUpload();
      getStudentMap();
    }
    catch (error) { Alert.alert('Error', 'Upload failed.') }
  };

  //view images
  useEffect(() => {
    if (mComp != 0)
      setInImageView(true);
    else
      setInImageView(false)
  }, [mComp]);

  const handleImagesView = (comp) => {
    if (mComp == 0)
      setMComp(comp)
    else {
      setMComp(0);
      getStudentMap();
    }

  }

  const handleDeleteImage = (file) => {
    Alert.alert(
      'Title',
      `Are you sure you want to delete this image?`,
      [
        { text: 'Cancel', style: 'cancel', onPress: () => { return } },
        {
          text: 'OK',
          onPress: () => {
            axios.delete(`${simulatorAPI}/api/Maps/fileId/${file.fileId}/fileUrl/${file.fileUrl}`)
              .then((res) => handleImagesView())
              .catch((err) => Alert.alert('Error', 'Could not delete the image.'));
          },
        },
      ], { cancelable: false }
    );
  }



  return (
    <>
      {currentLocation && (
        <View style={{ height: height, flex: 1 }}>

          {!inEdit && !inImageView &&
            <>
              {inAddLoc &&
                <View style={{ marginTop: 1, zIndex: 1, position: 'absolute', width: '100%' }}>
                  <GooglePlacesAutocomplete placeholder='Search' onPress={handleSearchSelect} fetchDetails={true}
                    query={{
                      key: 'AIzaSyDqlfGpzyH7uvCHAmWxaFiCiBY_2JzupdI',
                      language: 'en',
                      types: 'geocode',
                    }}
                    nearbyPlacesAPI='GooglePlacesSearch'
                    debounce={400}
                  />
                </View>
              }
              <View style={{ flex: inAddLoc ? 10 : 15, zIndex: 0 }}>
                <MapView
                  style={styles.map}
                  initialRegion={currentLocation}
                  provider="google"
                  customMapStyle={[]}
                  showsUserLocation={true}
                  showsMyLocationButton={true}
                  mapType="hybrid"
                  ref={mapViewRef}
                >
                  {selectedLocation && inAddLoc && (
                    <Marker coordinate={selectedLocation} />
                  )}
                  {
                    map.map((comp, index) => (

                      <Marker
                        coordinate={{
                          latitude: comp.latitude,
                          longitude: comp.longitude,
                        }}
                        anchor={{ x: 0.5, y: 0.5 }}
                        onPress={() => console.log('Marker pressed')}
                      >
                        {renderCustomMarker(`${simulatorAPI}/Images/${comp.files[0].fileUrl}`)}
                      </Marker>
                    ))
                  }
                </MapView>
              </View>

              {inAddLoc &&
                <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'grey', borderTopWidth: 1, borderColor: 'grey' }}>
                  <Button mode='contained' labelStyle={{ fontSize: 20, paddingTop: 10 }} style={{ flex: 1, borderRadius: 5, borderRightWidth: 0.5, borderColor: 'black' }}
                    onPress={() => handleCancelLocation()}>
                    Cancel
                  </Button>
                  <Button mode='contained' labelStyle={{ fontSize: 20, paddingTop: 10 }} style={{ flex: 4, borderRadius: 5 }}
                    disabled={!canChooseLoc} onPress={() => handleChooseLocation()}>
                    Choose location
                  </Button>
                </View>
              }
              {
                !inAddLoc &&
                <ScrollView style={styles.bar} showsHorizontalScrollIndicator={false} horizontal={true}>
                  <View style={{ flexDirection: 'row', marginHorizontal: 20 }}>
                    <View>
                      <Avatar.Icon size={50} icon="airplane-landing" style={{ alignSelf: 'center', marginTop: 55 }} />
                      <Text >{formattedDate}</Text>
                    </View>

                    {
                      map.map((comp, index) => (
                        <>
                          <View style={{ borderWidth: 1.5, width: 70, height: 1, borderColor: theme.colors.backdrop, alignSelf: 'center' }}></View>
                          <View style={styles.card} elevation={2}>
                            <View>
                              <Text style={{ position: 'absolute', bottom: 1, zIndex: 1, paddingHorizontal: 5, fontWeight: 'bold', color: 'white', fontSize: 20 }}>{comp.locationName}</Text>
                              {comp.files[0].fileUrl == null && <Text style={{ position: 'absolute', bottom: 45, zIndex: 1, paddingHorizontal: 5, fontWeight: 'bold', color: theme.colors.primary, fontSize: 22, alignSelf: 'center' }}>No photos yet</Text>}
                              <TouchableOpacity
                                style={{ height: 110, borderTopRightRadius: 18, borderTopLeftRadius: 18, backgroundColor: 'green' }}
                                onLongPress={() => mapViewRef.current.animateToRegion({
                                  latitude: comp.latitude,
                                  longitude: comp.longitude,
                                  latitudeDelta: 0.0922,
                                  longitudeDelta: 0.0421
                                })}
                                onPress={() => (comp.files[0].fileUrl == null ? console.log() : handleImagesView(comp))}
                              >
                                <Image
                                  source={{ uri: comp.files[0].fileUrl == null ? dumim : `${simulatorAPI}/Images/${comp.files[0].fileUrl}` }}
                                  style={{ height: '100%', width: '100%', borderTopRightRadius: 18, borderTopLeftRadius: 18 }}
                                />
                              </TouchableOpacity>
                            </View>
                            <View style={styles.buttonsContainer}>
                              <View style={{ borderRightWidth: 1, borderColor: 'grey', flex: 1 }}>
                                <Button mode='text' onPress={() => handleEdit(comp.locationId)}>Take photo</Button>
                              </View>
                              <View style={{ flex: 1 }}>
                                <Button mode='text' textColor='grey' onPress={() => handleDelete(comp)}>Delete</Button>
                              </View>
                            </View>
                          </View>
                        </>
                      ))
                    }



                    <View style={{ borderWidth: 1.5, borderStyle: 'dashed', width: 70, height: 1, borderColor: theme.colors.backdrop, alignSelf: 'center', marginHorizontal: 0 }}></View>

                    <Card style={{ ...styles.card, borderWidth: 1.5, borderStyle: 'dashed', borderColor: theme.colors.backdrop }}>
                      <IconButton icon='plus-circle-outline' size={50} iconColor={theme.colors.primary} style={{ alignSelf: 'center', marginBottom: -10, marginTop: 25 }}
                        onPress={() => setInAddLoc(prev => !prev)}></IconButton>
                      <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'grey' }}>Add new location</Text>
                    </Card>

                  </View>
                </ScrollView>
              }
            </>
          }

          {inEdit && !inImageView &&
            <View style={styles.container}>
              <IconButton
                icon="folder"
                size={30}
                color="#FFFFFF"
                onPress={pickImage}
                style={styles.folderButton}
              />
              <IconButton
                icon="camera"
                size={30}
                color="#FFFFFF"
                onPress={takePhoto}
                style={styles.cameraButton}
              />

              {image ? (
                <Image source={{ uri: image }} style={styles.image} />
              ) : (
                <AntDesign name="picture" size={120} color="#FFFFFF" style={styles.placeholderIcon} />
              )}

              {/* <TextInput
                placeholder="Enter description"
                value={description}
                onChangeText={(text) => setDescription(text)}
                style={styles.input}
              /> */}

              <View style={styles.buttonContainer}>
                <Button
                  mode="contained"
                  onPress={(cancelUpload)}
                  style={[styles.button, styles.cancelButton]}
                  labelStyle={styles.buttonLabel}
                  contentStyle={styles.buttonContent}
                  icon={({ color, size }) => <AntDesign name="close" size={size} color={color} />}
                >
                  Cancel
                </Button>

                <Button
                  mode="contained"
                  onPress={uploadImage}
                  style={[styles.button, styles.uploadButton]}
                  labelStyle={styles.buttonLabel}
                  contentStyle={styles.buttonContent}
                  icon={({ color, size }) => <AntDesign name="upload" size={size} color={color} />}
                  disabled={!image}
                >
                  Upload
                </Button>
              </View>
            </View>
          }

          {!inEdit && inImageView &&
            <View style={styles.swipeContainer}>
              <View style={styles.con}>
                <TouchableOpacity onPress={() => handleImagesView()}>
                  <Text style={styles.backButtonText}>{'< Back'}</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.locationName}>{mComp.locationName}</Text>

              <Swiper style={styles.swiperContainer}>
                {mComp !== 0 && mComp.files.map(file => (
                  <>
                    <IconButton icon='delete' size={40} style={{ position: 'absolute', zIndex: 1 }} onPress={() => handleDeleteImage(file)}></IconButton>
                    <View style={styles.slideContainer} key={file.fileId}>
                      <Image source={{ uri: `${simulatorAPI}/Images/${file.fileUrl}` }} style={styles.imagea} />
                      <ScrollView style={styles.description}>
                        {/* <TextInput editable={false} multiline={true} style={{ backgroundColor: 'white', margin: 10, width: '100%' }}>
                          {file.description}
                        </TextInput> */}
                      </ScrollView>
                    </View>
                  </>
                ))}
              </Swiper>
            </View>
          }

        </View>
      )}
    </>
  );
};


const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  customMarkerContainer: {
    alignItems: 'center',
  },
  customMarker: {
    backgroundColor: 'rgba(0, 122, 255,0.8)',
    borderRadius: 30,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerImage: {
    width: 40,
    height: 40,
    borderRadius: 30,
  },
  customMarkerCircle: {
    backgroundColor: 'rgba(0, 122, 255, 0.2)',
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.5)',
  },

  bar: {
    borderTopWidth: 1,
    height: '20%',
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  card: {
    marginVertical: 10,
    backgroundColor: 'white',
    width: 200,
    height: '90%',
    borderRadius: 15,
  },
  buttonsContainer: {
    height: '25%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },


  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  folderButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#2196F3',
  },
  cameraButton: {
    position: 'absolute',
    top: 20,
    right: 80,
    backgroundColor: '#2196F3',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  placeholderIcon: {
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white'
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: 'red',
  },
  uploadButton: {
    backgroundColor: '#2196F3',
  },
  buttonLabel: {
    fontWeight: 'bold',
  },
  buttonContent: {
    flexDirection: 'row',
  },


  swipeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  locationName: {
    flex: 0.12,
    fontSize: 25,
    fontWeight: 'bold',
    backgroundColor: '#282E3A',
    width: '100%',
    textAlign: 'left',
    paddingTop: 5,
    paddingLeft: 10,
    color: "white"
  },
  swiperContainer: {
  },
  slideContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagea: {
    marginTop: 5,
    flex: 2,
    width: '100%',
    height: '99%',
    resizeMode: 'contain',
    zIndex: 0
  },
  description: {
    flex: 1,
    width: '100%',
    marginRight: 10
  },
  con: {
    width: '100%',
    backgroundColor: '#282E3A'
  },
  backButtonText: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: 'bold'
  },
});

export default MyMap;

