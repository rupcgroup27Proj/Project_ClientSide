import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

//User context
import UserProvider from './Components/Contexts/UserContext';
//Main component
import Main from './Main';


export default function App() {

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <UserProvider>

          <Main />

        </UserProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

