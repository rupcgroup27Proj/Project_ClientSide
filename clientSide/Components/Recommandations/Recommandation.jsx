import React from 'react';
import { View, Image, Linking } from 'react-native';
import { Card, Text } from 'react-native-paper';

import { Video, AVPlaybackStatus } from 'expo-av';

import { styles } from './Styles';


//

const Recommandation = ({ page }) => {



    //
    return (
        <Card style={styles.card} onPress={()=>Linking.openURL(`https://en.wikipedia.org/?curid=${page.pageId}`)}>
            <View style={styles.header}>
                <Text style={styles.username}>{page.title}</Text>
            </View>
            <View>
                <Text>{page.intro}</Text>
            </View>
            
             {/* type === 'I' ? (
                 <Image source={{ uri: uri }} style={styles.image} />
             ) : */}

             
                <View style={styles.textView}>
                {/* <Text onPress={() => Linking.openURL(`https://en.wikipedia.org/?curid=${page.pageId}`)}>{uri}</Text>  */}
                
                </View>
             
            {/* : (
                 <Video source={{ uri: uri }}  useNativeControls resizeMode="contain" style={styles.video} />
            ) */}
            
        </Card>
    );
};

export default Recommandation;
