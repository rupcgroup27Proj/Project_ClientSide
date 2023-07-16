import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Checkbox, Divider, List, TextInput } from 'react-native-paper';
import { useAPI } from '../../../Components/Contexts/APIContext';
import { useUser } from '../../../Components/Contexts/UserContext';
import axios from 'axios';
import { useToken } from '../../../Components/Contexts/TokenContext';


const Nft = () => {

  const { sendPushNotification } = useToken();
  const { currentUser } = useUser();
  const { simulatorAPI } = useAPI();
  const [data, setData] = useState([]);
  const [msgText, setMsgText] = useState('');
  const [selectedTokens, setSelectedTokens] = useState([]);

  useEffect(() => {
    const getTokens = async () => {
      try {
        const response = (await axios.get(`${simulatorAPI}/api/Students/gId/${currentUser.groupId}`));
        setData(response.data.map(item => item))
      }
      catch (error) { Alert.alert("Error", "Failed to fetch Feedbacks."); }
    };
    getTokens();
  }, [])

  const handleSelectItem = (token) => {
    if (selectedTokens.includes(token)) {
      setSelectedTokens(selectedTokens.filter((item) => item !== token));
    } else {
      setSelectedTokens([...selectedTokens, token]);
    }
  };

  const handleSelectAll = () => {
    if (selectedTokens.length === data.length) {
      setSelectedTokens([]);
    } else {
      const allTokens = data.map((item) => item.token);
      setSelectedTokens(allTokens);
    }
  };

  const handleSend = () => {
    sendPushNotification(selectedTokens, msgText);
    setMsgText('');
    setSelectedTokens([]);
  }

  return (
    <View>
      <ScrollView style={{ height: '40%', borderBottomWidth: 1.2, paddingHorizontal: 15 }}>
        <List.Section>
          <List.Subheader style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#2196F3' }}>Who do you want to send a message to?</List.Subheader>
          <List.Item
            title="Select All"
            left={() => (
              <Checkbox
                status={
                  selectedTokens.length === data.length ? 'checked' : 'unchecked'
                }
                onPress={handleSelectAll}
              />

            )}

          />
          <Divider bold={true}></Divider>
          {data.map((item) => (
            <List.Item
              key={item.firstName + item.lastName}
              title={`${item.firstName} ${item.lastName}`}
              style={{ borderBottomWidth: 0.19, borderColor: 'black' }}
              left={() => (
                <Checkbox
                  disabled={item.token == ""}
                  status={
                    selectedTokens.includes(item.token)
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() => handleSelectItem(item.token)}
                />
              )}

            />

          ))}
        </List.Section>
      </ScrollView>
      <TextInput multiline={true} numberOfLines={15} value={msgText} onChangeText={(text) => setMsgText(text)} placeholder={'Your message:'} style={{ backgroundColor: 'white', borderWidth: 1, borderColor: "#2196F3", margin: 10 }}></TextInput>
      <Button mode="contained" onPress={() => { handleSend() }} disabled={msgText == '' || selectedTokens.length == 0} style={{ marginHorizontal: 10 }}>Send</Button>
    </View>
  );
};

export default Nft;
