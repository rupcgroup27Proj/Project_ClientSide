//Formatted
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import UserProvider from './Components/Contexts/UserContext';
import Main from './Main'; //Main component

//Customized theme - changing Paper's default purple colors. 
const theme = {
  ...DefaultTheme,
  roundness: 5,
  myOwnProperty: true,
  colors: {
    ...DefaultTheme.colors,
    primary: 'blue',
    secondary: 'rgba(44, 199, 242, 0.1)',
    accent: 'green',
    //myColor: 'black'
  }
};

//social
import NewPost from "./Screens/StudentScreens/SocialCloud/NewPost";
import SocialFeed from "./Screens/StudentScreens/SocialCloud/SocialFeed";
import Favorites from "./Screens/StudentScreens/SocialCloud/Favorites";
import Comments from "./Screens/StudentScreens/SocialCloud/Comments";

//delei
import AddSchool from "./Screens/AdminScreens/Delegations/AddDelegations/AddSchool";
import AddTeacher from "./Screens/AdminScreens/Delegations/AddDelegations/AddTeacher";
import AddGuide from "./Screens/AdminScreens/Delegations/AddDelegations/AddGuide";
import AllDelegetions from "./Screens/AdminScreens/Delegations/AllDelegations/AllDelegetions";
import DetailsDelegation from "./Screens/AdminScreens/Delegations/AllDelegations/DetailsDelegation";


import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>

      <NavigationContainer>
        <UserProvider>
          <PaperProvider theme={theme}>

            <Main />

          </PaperProvider>
        </UserProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
