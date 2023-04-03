import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

//User context
import UserProvider from "./Components/Contexts/UserContext";

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
        <Stack.Navigator initialRouteName="SocialFeed">
        <Stack.Screen name="SocialFeed" component={SocialFeed} />
          <Stack.Screen name="Favorites" component={Favorites} />
          <Stack.Screen name="NewPost" component={NewPost} />
          <Stack.Screen name="Comments" component={Comments} />

           {/* <Stack.Screen name="AddSchool" component={AddSchool} />
          <Stack.Screen name="AddGuide" component={AddGuide} />
          <Stack.Screen name="DetailsDelegation" component={DetailsDelegation} />
          <Stack.Screen name="AddTeacher" component={AddTeacher} />
          <Stack.Screen name="AllDelegetions" component={AllDelegetions} />  */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
