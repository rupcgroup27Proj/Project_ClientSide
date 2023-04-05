import { View, Text, Alert } from 'react-native'
import React from 'react'
import { useUser } from '../../../Components/Contexts/UserContext'
import { useFocusEffect } from '@react-navigation/native';

const Logout = ({ navigation }) => {
    const { logout } = useUser();

    useFocusEffect(
        React.useCallback(() => {
            Alert.alert(
                'Wait!',
                `Are you sure you want to log out?`,
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                        onPress: () => { navigation.navigate('Home') }
                    },
                    {
                        text: 'OK',
                        onPress: () => {
                            logout();
                        },
                    },
                ],
                { cancelable: false }
            );
        }, [])
    );

    return (
        <View style={{height:'100%', backgroundColor:'#33383E'}}>
            
        </View>
    )
}

export default Logout
