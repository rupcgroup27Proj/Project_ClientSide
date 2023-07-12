import { Dimensions, ImageBackground, ScrollView, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Styles } from "./Styles"
import { useUser } from '../../../Components/Contexts/UserContext'
import { Button, Card, Divider, IconButton } from 'react-native-paper'
import axios from 'axios'
import { useAPI } from '../../../Components/Contexts/APIContext'
import { useFocusEffect } from '@react-navigation/native'


const Home = () => {

  const { simulatorAPI } = useAPI();
  const { currentUser } = useUser();
  const [posts, setPosts] = useState([]);

  async function getAllPosts() {
    await axios.get(`${simulatorAPI}/api/SocialCloud/groupId/${currentUser.groupId}`)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.log("getAllPosts " + err));
  }

  useFocusEffect(
    useCallback(() => {
      getAllPosts();
    }, [])
  );

  return (
    <View>
      <Text style={Styles.title}> Hello {currentUser.firstName}!</Text>
      <Divider bold={true} />

      <View style={Styles.ibView}>
        <View style={Styles.ibSubView}>
          <IconButton icon="map" iconColor={'#2196F3'} size={50} mode={'contained'} containerColor={'rgba(44, 199, 242, 0.1)'} animated={true} onPress={() => console.log('Pressed')} />
          <Text style={Styles.ibText}>My map</Text>
        </View>
        <View style={Styles.ibSubView}>
          <IconButton icon="progress-question" iconColor={'#2196F3'} mode={'contained'} containerColor={'rgba(44, 199, 242, 0.1)'} size={50} onPress={() => console.log('Pressed')} />
          <Text style={Styles.ibText}>Questionnaires</Text>
        </View>
        <View style={Styles.ibSubView}>
          <IconButton icon="file-document-outline" iconColor={'#2196F3'} mode={'contained'} containerColor={'rgba(44, 199, 242, 0.1)'} size={50} onPress={() => console.log('Pressed')} />
          <Text style={Styles.ibText}>Tasks </Text>
        </View>
      </View>

      <Divider bold={true} />

      <Text style={Styles.simText}>Recent posts:</Text>
      <ScrollView horizontal={true}>

        {posts.length === 0 ? (
          <View>
            <ImageBackground
              source={require('../../../assets/Images/blurPosts.png')}
              style={{ height: 200, width: Dimensions.get('window').width,display:'flex',justifyContent:'center'}}
              blurRadius={1}
            >
              <Text style={Styles.noPostText}>No posts yet</Text>
            </ImageBackground>
          </View>

        ) : (
          <>
            {posts.map((post, index) => (
              <Card key={index} style={Styles.card}>
                <Card.Content>
                  <Text style={Styles.cardTitle}>{`${post.FirstName} ${post.LastName}`}</Text>
                </Card.Content>
                <Card.Cover source={{ uri: post.FileUrl }} />
              </Card>
            ))}
          </>
        )}

      </ScrollView>

    </View>
  )
}

export default Home

