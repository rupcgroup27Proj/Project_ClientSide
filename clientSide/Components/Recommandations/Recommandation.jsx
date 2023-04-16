import React from 'react';
import { View, Image, Linking } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { styles } from './Styles';

//============| Creates a rcmnd card using the data from Wikipedia |============//
const Recommandation = ({ page }) => {

    const uri = page.image;
    const theme = useTheme();


    return (
        <Card style={styles.card} onPress={() => Linking.openURL(`https://en.wikipedia.org/?curid=${page.pageId}`)}>
            <View style={styles.header}>
                <Text style={styles.title}>{page.title}</Text>
            </View>
            <View style={styles.imageView}>
                <Image style={styles.image} source={{ uri: uri }} />
            </View>
            <Text style={styles.intro}>{page.intro}</Text>
            <Text style={{ paddingLeft: 10, paddingBottom: 10, color: theme.colors.primary, fontWeight: 'bold' }}>Click here for more information</Text>
        </Card>
    );
};

export default Recommandation;
