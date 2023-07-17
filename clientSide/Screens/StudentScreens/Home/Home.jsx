import { Dimensions, ImageBackground, ScrollView, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Styles } from "./Styles"
import { useUser } from '../../../Components/Contexts/UserContext'
import { Button, Card, Divider, IconButton, TextInput } from 'react-native-paper'
import axios from 'axios'
import { useAPI } from '../../../Components/Contexts/APIContext'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useTeacher } from '../../../Components/Contexts/TeacherContext'

//Wikipedia Get:
const endpoint = 'https://en.wikipedia.org/w/api.php?'; //Wikipedia's API
const params = {
  //Level 1 params
  action: 'query',     //Which action to perform. 'query' - fetch data from the api.
  format: 'json',      //In what format we want the output.
  origin: '*',         //For avoiding CORS problems (like in our server).
  //Level 2 - inside 'query'
  prop: 'extracts|pageimages',    //What properties we want to get from the page. Title only? maybe a picture? etc. 'extracts' - all olain text.
  generator: 'search',
  //level 3 - inside 'extracts'
  exchars: 500,        //How many letters to return.
  exintro: true,       //Get the data from the intro alone - not from the whole page.
  explaintext: true,   //Return the data as plain text (default is as a html div)
  //level 3 - inside 'generator'
  gsrlimit: 1,        //How many search results to get back.
  piprop: 'thumbnail',
  pithumbsize: 250
};
//////////////////////////////////////////////////////////////////////////////////////////////

const Home = () => {

  const {remainingDays } = useTeacher();
  const { simulatorAPI } = useAPI();
  const { currentUser } = useUser();
  const [posts, setPosts] = useState([]);
  const [recArray, setRecArray] = useState([]);
  const navigation = useNavigation();

  const GetRecommendations = async () => {
    const tags = await axios.get(`${simulatorAPI}/api/Algorithms/studentId/${currentUser.id}`);
    let array = await Promise.all(tags.data.map(async tag => {
      try {
        const page = await axios.get(endpoint, { params: { ...params, gsrsearch: tag } });
        return gatherPages(page.data.query.pages)
      }
      catch { return null }
    }).filter(promise => promise !== null)
    )
    setRecArray(array.filter(rec => rec != null));
  }

  const gatherPages = (pages) => {
    return Object.values(pages)
      .map(page => (
        {
          title: page.title,
          intro: removeBracketsAndContents(page.extract)
        }
      ))
  }

  const removeBracketsAndContents = (str) => {
    const stack = []
    let newStr = ''
    for (const char of str) {
      if (char == '(') {
        stack.push(char)
      } else if (char == ')') {
        stack.pop()
      } else if (stack.length == 0) {
        newStr += char
      }
    }
    return newStr.replace("  ", " ");
  }


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
      GetRecommendations();
    }, [])
  );

  if (remainingDays)
    return (
      <ImageBackground source={require('../../../assets/Images/Homeback.png')} style={{ height: Dimensions.get('window').height }}>
        <Text style={{ fontSize: 24, marginHorizontal: 10, marginVertical: 20, textAlign: 'center' }}>Remaining days until delegetion starts: </Text>
        <Text style={{ fontSize: 50, textAlign: 'center', color: '#2196F3', fontWeight: 'bold' }}>{remainingDays}</Text>
      </ImageBackground>
    )
  else
    return (
      <ImageBackground source={require('../../../assets/Images/Homeback.png')} style={{ height: Dimensions.get('window').height }} >
        <View style={Styles.con}>
          <Text style={Styles.title}>Hello {currentUser.firstName}!</Text>

          <View style={Styles.ibView}>
            <View style={Styles.ibSubView}>
              <IconButton icon="map" iconColor={'#2196F3'} size={50} mode={'contained'} containerColor={'rgba(255, 255, 255, 0.9)'} animated={true} onPress={() => navigation.navigate('My Map')} />
              <Text style={Styles.ibText}>My map</Text>
            </View>
            <View style={Styles.ibSubView}>
              <IconButton icon="progress-question" iconColor={'#2196F3'} mode={'contained'} containerColor={'rgba(255, 255, 255, 0.9)'} size={50} onPress={() => navigation.navigate('Questionnaires')} />
              <Text style={Styles.ibText}>Questionnaires</Text>
            </View>
            <View style={Styles.ibSubView}>
              <IconButton icon="file-document-outline" iconColor={'#2196F3'} mode={'contained'} containerColor={'rgba(255, 255, 255, 0.9)'} size={50} onPress={() => navigation.navigate('Tasks')} />
              <Text style={Styles.ibText}>Tasks </Text>
            </View>
          </View>


          <View style={Styles.postCon}>
            <Text style={Styles.simText} onPress={() => navigation.navigate('Social Cloud')}>Recent posts:</Text>
            <ScrollView horizontal={true} style={{ borderTopWidth: 0.5, borderColor: 'rgba(44, 199, 242, 0.9)' }}>

              {posts.length === 0 ? (
                <View>
                  <ImageBackground
                    source={require('../../../assets/Images/blurPosts.png')}
                    style={{ height: 200, width: Dimensions.get('window').width, display: 'flex', justifyContent: 'center' }}
                    blurRadius={1}
                  >
                    <Text style={Styles.noPostText}>No posts yet</Text>
                  </ImageBackground>
                </View>

              ) : (
                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                  {posts.map((post, index) => (
                    <Card key={index} style={Styles.card} onPress={() => navigation.navigate('Social Cloud')}>
                      <Card.Content>
                        <Text style={Styles.cardTitle}>{`${post.FirstName} ${post.LastName}`}</Text>
                      </Card.Content>
                      <Card.Cover source={{ uri: post.FileUrl }} />
                    </Card>
                  ))}
                </View>
              )}

            </ScrollView>
          </View>

          <View style={Styles.recView}>
            <Text style={Styles.simText} onPress={() => navigation.navigate('Recommandations')}>Recommandations:</Text>
            <ScrollView style={{ borderWidth: 1.5, borderRadius: 10, borderColor: '#2196F3', padding: 2, backgroundColor: 'white', marginBottom: 60 }}>
              {recArray.map((rec, index) => (
                <>
                  <View key={index}>
                    <Text style={Styles.recT} onPress={() => navigation.navigate('Recommandations')} >{`${rec[0].title}`} </Text>
                    <Divider bold={true}></Divider>
                    <Text style={Styles.recI} onPress={() => navigation.navigate('Recommandations')}>{rec[0].intro}</Text>
                    <Divider bold={true}></Divider>
                  </View>

                </>
              ))}
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    )
}

export default Home

