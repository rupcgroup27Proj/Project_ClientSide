import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useContext, createContext, useState, useEffect } from "react";
import { Alert } from "react-native";



const UserContext = createContext();

export function useUser() {
    return useContext(UserContext);
}

export default function UserProvider({ children }) {

    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    const getLoggedUser = async () => {
         //await AsyncStorage.removeItem('currentUser')
        const currentUser = await AsyncStorage.getItem('currentUser');
        if (!currentUser)
            return;
        try {
            const response = await axios.get(`http://10.0.2.2:5283/api/Generic/id/${JSON.parse(currentUser).personalId}/password/${JSON.parse(currentUser).password}/type/${JSON.parse(currentUser).type}`);
            !response.data.email ? AsyncStorage.removeItem('currentUser') : setCurrentUser(JSON.parse(currentUser))
        } catch (error) {
            Alert.alert('Error', 'Cannot connect to the server.');
        }
    }


    const login = async (userId, password, userType) => {
        if (!userId || !password || !userType) {
            Alert.alert('Error', 'All fields must be filled.');
            return;
        }

        try {
            const response = await axios.get(`http://10.0.2.2:5283/api/Generic/id/${userId}/password/${password}/type/${userType}`, { timeout: 7000 });
            const loggedUser = response.data;
            AsyncStorage.setItem('currentUser', JSON.stringify(loggedUser));
            Alert.alert('Success', 'Login successful!');
            setCurrentUser(loggedUser);
        } catch (error) {
            Alert.alert('Error', 'Credentials incorrect.');
            AsyncStorage.removeItem('currentUser')
        }


    }

    useEffect(() => {
        getLoggedUser();
        setIsLoading(false);
    }, [])



    const value = {
        currentUser,
        isLoading,
        login
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
