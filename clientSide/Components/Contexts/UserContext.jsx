//Formatted
import { useContext, createContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useAPI } from "./APIContext";

const UserContext = createContext();


export function useUser() {
    return useContext(UserContext);
}

export default function UserProvider({ children }) {

    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const { simulatorAPI } = useAPI();

    //If the user logged once, the app will log him in automatically using asyncStorage (after checking he has not been deleted from the server).
    const getLoggedUser = async () => {
        //await AsyncStorage.removeItem('currentUser');
        const currentUser = await AsyncStorage.getItem('currentUser');
        if (!currentUser) {
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.get(`${simulatorAPI}/api/Generic/id/${JSON.parse(currentUser).personalId}/password/${JSON.parse(currentUser).password}/type/${JSON.parse(currentUser).type}`, { timeout: 5000 });
            !response.data.email ? AsyncStorage.removeItem('currentUser') : setCurrentUser(JSON.parse(currentUser));

        } catch (error) { Alert.alert('Error', 'Cannot connect to the server.'); }
        setIsLoading(false);
    }

    //Login a user after validating all fields.
    const login = async (userId, password, userType) => {

        if (!userId || !password || !userType) {
            Alert.alert('Error', 'All fields must be filled.');
            return;
        }
        setIsDisabled((prevDisabled) => !prevDisabled)
        try {
            const response = await axios.get(`${simulatorAPI}/api/Generic/id/${userId}/password/${password}/type/${userType}`, { timeout: 5000 });
            const loggedUser = response.data;

            if (!response.data.email) {
                Alert.alert('Error', 'Credentials incorrect.');
                setIsDisabled((prevDisabled) => !prevDisabled)
                return;
            }
            if (loggedUser.isAdmin)
                loggedUser.type = "Admin";
            AsyncStorage.setItem('currentUser', JSON.stringify(loggedUser));
            Alert.alert('Success', 'Login successful!');
            setCurrentUser(loggedUser);
        } catch (error) {
            Alert.alert('Error', 'Encountered an error.');
            AsyncStorage.removeItem('currentUser');
        }

        setIsDisabled((prevDisabled) => !prevDisabled)
    }

    const logout = () => {
        AsyncStorage.removeItem('currentUser');
        setCurrentUser(null);
    }

    useEffect(() => {
        getLoggedUser();
    }, [])

    const value = {
        currentUser, //Returns "currentUser" for convenient use all over the app.
        isLoading,   //Returns "isLoading" for the ActivityIndicator.
        isDisabled,  //For handling the Login button.
        login,       //Returns "login" for logging in the user in the login screen for keeping it clean.
        logout
    }


    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
