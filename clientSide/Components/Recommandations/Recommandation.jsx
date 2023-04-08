import React from 'react';
import { View, Image, Linking } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { styles } from './Styles';


const Recommandation = ({ page }) => {

    const uri = page.image;


    return (
        <Card style={styles.card} onPress={() => Linking.openURL(`https://en.wikipedia.org/?curid=${page.pageId}`)}>
            <View style={styles.header}>
                <Text style={styles.title}>{page.title}</Text>
            </View>
            <View style={styles.imageView}>
                <Image style={styles.image} source={{ uri: uri }} />
            </View>
            <Text style={styles.intro}>{page.intro}</Text>
            <Text style={styles.intro}>Click here for more information</Text>
        </Card>
    );
};

export default Recommandation;
