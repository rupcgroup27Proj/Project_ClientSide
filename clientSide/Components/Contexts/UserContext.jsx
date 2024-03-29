import { useContext, createContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useAPI } from "./APIContext";
import { useToken } from "./TokenContext";

//--------------| Used for login, logout, and stores the logged users data  |--------------//

const UserContext = createContext();

export function useUser() {
    return useContext(UserContext);
}

export default function UserProvider({ children }) {

    const { registerForPushNotificationsAsync } = useToken()
    const { simulatorAPI } = useAPI();
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);


    //--------------| Functions |--------------//


    //If the user logged once, the app will log him in automatically using asyncStorage (after checking he has not been deleted from the server).
    const getLoggedUser = async () => {
        const currentUser = await AsyncStorage.getItem('currentUser');
        if (!currentUser) {
            setIsLoading(false);
            return;
        }
        setCurrentUser(JSON.parse(currentUser));
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
            let loggedUser = response.data;

            if (loggedUser.type == "Student" && loggedUser.token == "")
                createToken(loggedUser.id);
            if (loggedUser.type == "Guide" || loggedUser.type == "Teacher")
                loggedUser = { ...loggedUser, groupId: -1 };

            if (!response.data.email) {
                Alert.alert('Error', 'Credentials incorrect.');
                setIsDisabled((prevDisabled) => !prevDisabled);
                return;
            }
            if (loggedUser.isAdmin)
                loggedUser.type = "Admin";

            AsyncStorage.setItem('currentUser', JSON.stringify(loggedUser));
            setCurrentUser(loggedUser);
        } catch (error) {
            console.log(error)
            Alert.alert('Error', 'Encountered and error.');
            AsyncStorage.removeItem('currentUser');
        }

        setIsDisabled((prevDisabled) => !prevDisabled);
    }

    const logout = () => {
        AsyncStorage.removeItem('currentUser');
        setCurrentUser(null);
    }


    //==================| for the teacher to render all students |==================//
    const [students, setStudents] = useState([]);

    const fetchStudents = () => {
        axios.get(`${simulatorAPI}/api/Students/groupId/${currentUser.groupId}`)
            .then(response => { setStudents(response.data); })
            .catch(error => { Alert.alert('Error', 'Encounterd an error while fetching students.'); });
    }
    //==============================================================================//


    useEffect(() => {
        getLoggedUser();
    }, [])
    //--------------| End of functions |--------------//


    //Creates a token
    const createToken = async (sdntId) => {
        console.log('fetching token')
        const t = await registerForPushNotificationsAsync();
        axios.put(`${simulatorAPI}/api/Students/studentId/${sdntId}/token/${t}`);
    }


    const value = {
        setCurrentUser,
        currentUser, //Returns "currentUser" for convenient use all over the app.
        isLoading,   //Returns "isLoading" for the ActivityIndicator.
        isDisabled,  //For handling the Login button.
        login,       //Returns "login" for logging in the user in the login screen for keeping it clean.
        logout,
        fetchStudents,
        students
    }


    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
