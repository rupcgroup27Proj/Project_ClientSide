import React, { useEffect, useState } from 'react'
import { Styles } from "./Styles"
import Recommandation from '../../../Components/Recommandations/Recommandation'
import { ScrollView } from 'react-native-gesture-handler'
import axios from 'axios'

//Wikipedia Get:
const endpoint = 'https://en.wikipedia.org/w/api.php?'; //Wikipedia's API
const RecommendationsAPI = `http://10.0.2.2:5283/api/SmartRecommandations/studentId/1` //what's the problem with local host? and why should i create a http request instead of https? 
const params = {
  //Level 1 params
  action: 'query',     //Which action to perform. 'query' - fetch data from the api.
  format: 'json',      //In what format we want the output.
  origin: '*',         //For avoiding CORS problems (like in our server).
  //Level 2 - inside 'query'
  prop: 'extracts',    //What properties we want to get from the page. Title only? maybe a picture? etc. 'extracts' - all olain text.
  generator: 'search',
  //level 3 - inside 'extracts'
  exchars: 500,        //How many letters to return.
  exintro: true,       //Get the data from the intro alone - not from the whole page.
  explaintext: true,   //Return the data as plain text (default is as a html div)
  //level 3 - inside 'generator'
  gsrlimit: 1,        //How many search results to get back.
};
//////////////////////////////////////////////////////////////////////////////////////////////


const Recommendations = () => {

  const [recArray, setRecArray] = useState([]);

  //for each tag, i wait for the axios request to be completed and that return the data of the page. i wait until all tags has finished, inserting them into
  //"array". if theres an error or something - i return null. than i filter the nulls and changing the state using SetRecArray.
  const GetRecommendations = async () => {
    const tags = await axios.get(RecommendationsAPI)//change to studentid from asyncStorage
    let array = await Promise.all(tags.data.map(async tag => {
      try {
        const page = await axios.get(endpoint, { params: { ...params, gsrsearch: tag } });
        return gatherPages(page.data.query.pages)
      }
      catch { return null }
    }).filter(promise => promise !== null)
    )
    setRecArray(array)
  }

  const gatherPages = (pages) => {
    return Object.values(pages)
      .map(page => (
        {
          pageId: page.pageid,
          title: page.title,
          intro: page.extract
        }
      ))
  }

  useEffect(() => {
    GetRecommendations();
  }, [])


  return (
    <ScrollView>
      {recArray.map((rcmnd, index) =>
        <Recommandation page={rcmnd[0]} key={index} />
      )}
    </ScrollView>
  )
}

export default Recommendations